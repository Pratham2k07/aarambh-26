const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const XLSX = require('xlsx');
const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signOut 
} = require('firebase/auth');
const { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  writeBatch 
} = require('firebase/firestore');

// 1. Load env config
const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("Error: .env.local file not found.");
  process.exit(1);
}

const config = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let val = match[2] || '';
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    config[key] = val;
  }
});

const firebaseConfig = {
  apiKey: config.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: config.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: config.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: config.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: config.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helpers
function getRowValue(row, possibleKeys) {
  for (const key of Object.keys(row)) {
    const cleanKey = key.trim().toLowerCase().replace(/[\r\n\s]+/g, ' ');
    for (const matchKey of possibleKeys) {
      if (cleanKey.includes(matchKey.toLowerCase())) {
        return row[key];
      }
    }
  }
  return undefined;
}

function parsePosition(positionStr) {
  if (!positionStr) return { team: 'Other', role: 'Volunteer' };
  const cleaned = positionStr.trim();
  
  const teamLeaderSuffixes = ['- Team Leader', '-Team Leader', ' - Team Leader', ' Team Leader'];
  const volunteerSuffixes = ['- Volunteer', '-Volunteer', ' - Volunteer', ' Volunteer'];
  
  let team = cleaned;
  let role = 'Volunteer';
  
  for (const suffix of teamLeaderSuffixes) {
    if (cleaned.endsWith(suffix)) {
      team = cleaned.slice(0, -suffix.length).trim();
      role = 'Team Leader';
      break;
    }
  }
  
  for (const suffix of volunteerSuffixes) {
    if (cleaned.endsWith(suffix)) {
      team = cleaned.slice(0, -suffix.length).trim();
      role = 'Volunteer';
      break;
    }
  }
  
  if (
    cleaned.includes('Head') || 
    cleaned.includes('Leader') || 
    cleaned.includes('Organizing Head') || 
    cleaned.includes('Cohort Leader') || 
    cleaned.includes('Cluster Head')
  ) {
    role = 'Team Leader';
  }
  
  if (team === 'Event &Venue Committee') team = 'Event & Venue Committee';
  if (team.toLowerCase() === 'social media') team = 'Social Media';
  
  return { team, role };
}

function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const specs = "@#$*%!";
  
  let pass = "";
  pass += caps[crypto.randomInt(0, caps.length)];
  pass += chars[crypto.randomInt(0, chars.length)];
  pass += nums[crypto.randomInt(0, nums.length)];
  pass += specs[crypto.randomInt(0, specs.length)];
  
  const all = chars + caps + nums + specs;
  for (let i = 0; i < 6; i++) {
    pass += all[crypto.randomInt(0, all.length)];
  }
  return pass.split('').sort(() => 0.5 - Math.random()).join('');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main Generation function
async function main() {
  try {
    console.log(`Connecting to Firebase Project: ${firebaseConfig.projectId}`);
    
    // Read spreadsheet
    const excelPath = 'D:/Master List Aarambh.xlsx';
    console.log(`Reading Excel file: ${excelPath}`);
    const workbook = XLSX.readFile(excelPath);
    const sheet = workbook.Sheets['Sheet1'];
    if (!sheet) throw new Error("Sheet1 not found");
    
    const rows = XLSX.utils.sheet_to_json(sheet);
    console.log(`Found ${rows.length} rows.`);

    const generatedUsers = [];
    const emailCounts = {};
    const teamCounts = {};

    // 1. Generate local credentials mapping
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rawName = getRowValue(row, ['name']);
      
      if (!rawName) continue;
      const name = String(rawName).trim();
      const rawPosition = getRowValue(row, ['position']) || '';
      
      const { team, role } = parsePosition(String(rawPosition));
      
      // Calculate UID sequence
      if (!teamCounts[team]) teamCounts[team] = 0;
      teamCounts[team]++;
      
      // Map team names to code
      const teamMap = {
        'Technical Committee': 'TECH',
        'Discipline Committee': 'DISC',
        'Feedback & Registration Committee': 'REG',
        'Hospitality Committee': 'HOSP',
        'Food & Accommodation Committee': 'FOOD',
        'Photography Committee': 'PHOTO',
        'Social Media': 'SOC',
        'Design Committee': 'DSGN',
        'Internal Arrangements Committee': 'INT',
        'Event & Venue Committee': 'EVENT',
        'Media Committee': 'MED',
        'Organizing Head': 'ORG',
        'Cluster Head': 'CLUS',
        'Cohort Leader': 'COH'
      };
      const code = teamMap[team] || 'VOL';
      const seqUid = `AAR-${code}-${String(teamCounts[team]).padStart(3, '0')}`;
      
      // Generate email (firstname.lastname@aarambh.jklu.edu.in)
      const nameParts = name.toLowerCase().replace(/[^a-z\s]/g, '').trim().split(/\s+/);
      let baseEmail = nameParts.join('.');
      if (nameParts.length === 1) baseEmail = `${nameParts[0]}.volunteer`;
      
      let email = `${baseEmail}@aarambh.jklu.edu.in`;
      if (emailCounts[email]) {
        emailCounts[email]++;
        email = `${baseEmail}${emailCounts[email]}@aarambh.jklu.edu.in`;
      } else {
        emailCounts[email] = 1;
      }
      
      const password = generatePassword();
      const passwordHash = hashPassword(password);
      
      generatedUsers.push({
        name,
        team,
        role,
        uid: seqUid,
        email,
        password,
        passwordHash,
        rollNo: String(getRowValue(row, ['roll no']) || '').trim(),
        gender: String(getRowValue(row, ['gender']) || '').trim(),
        mobile: String(getRowValue(row, ['mobile number', 'phone']) || '').trim(),
        hosteler: String(getRowValue(row, ['hostler/ day scholar', 'hosteler', 'scholar']) || '').trim(),
        location: String(getRowValue(row, ['jaipur/ non-jaipur', 'location']) || '').trim()
      });
    }

    console.log(`Generated ${generatedUsers.length} credentials in memory.`);

    // 2. Fetch existing volunteer UIDs in Firestore to prevent duplicate inserts and mappings
    console.log("Checking existing database users...");
    const volCollection = collection(db, 'volunteers');
    const existingVolunteersSnap = await getDocs(volCollection);
    const existingEmailsToUid = {};
    existingVolunteersSnap.forEach(d => {
      const data = d.data();
      if (data.email) {
        existingEmailsToUid[data.email] = d.id;
      }
    });

    // 3. Register users in Firebase Auth & Firestore
    console.log("Registering users to Firebase Auth and Firestore...");
    const credentialsOutput = [];
    credentialsOutput.push("Aarambh 2026 - Volunteer Account Credentials\n");
    
    for (let i = 0; i < generatedUsers.length; i++) {
      const vol = generatedUsers[i];
      let authUid = existingEmailsToUid[vol.email];
      
      if (!authUid) {
        try {
          // Attempt to create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, vol.email, vol.password);
          authUid = userCredential.user.uid;
          await signOut(auth); // Sign out the created user immediately
          console.log(`[${i+1}/${generatedUsers.length}] Created Auth User: ${vol.email} -> UID: ${authUid}`);
          await sleep(150); // Pause to throttle requests
        } catch (authErr) {
          if (authErr.code === 'auth/email-already-in-use') {
            console.log(`[${i+1}/${generatedUsers.length}] Email already registered in Auth: ${vol.email}`);
            // Check if we can find them in the database or need to use a fallback
            authUid = existingEmailsToUid[vol.email] || `vol_auth_${i}`;
          } else {
            console.error(`Error creating Auth user for ${vol.email}:`, authErr.message);
            authUid = `vol_auth_${i}`;
          }
        }
      } else {
        console.log(`[${i+1}/${generatedUsers.length}] User already synced: ${vol.email}`);
      }

      // Write to roles and volunteers collections in Firestore
      const roleRef = doc(db, 'roles', authUid);
      const volRef = doc(db, 'volunteers', authUid);
      const userRef = doc(db, 'users', authUid);
      
      const normalizedRole = vol.role === 'Team Leader' ? 'team_leader' : 'volunteer';
      
      await setDoc(roleRef, {
        role: normalizedRole,
        email: vol.email,
        createdAt: new Date()
      }, { merge: true });

      await setDoc(userRef, {
        uid: vol.uid,
        name: vol.name,
        email: vol.email,
        role: normalizedRole,
        team: vol.team,
        createdAt: new Date()
      }, { merge: true });
      
      await setDoc(volRef, {
        uid: vol.uid,
        name: vol.name,
        team: vol.team,
        role: vol.role,
        email: vol.email,
        passwordHash: vol.passwordHash,
        rollNo: vol.rollNo,
        gender: vol.gender,
        mobile: vol.mobile,
        hosteler: vol.hosteler,
        location: vol.location,
        updatedAt: new Date()
      }, { merge: true });

      // Add to output string
      credentialsOutput.push(`NAME: ${vol.name}`);
      credentialsOutput.push(`TEAM: ${vol.team}`);
      credentialsOutput.push(`ROLE: ${vol.role}`);
      credentialsOutput.push(`UID: ${vol.uid}`);
      credentialsOutput.push(`EMAIL: ${vol.email}`);
      credentialsOutput.push(`PASSWORD: ${vol.password}`);
      credentialsOutput.push("----------------------------------------\n");
    }

    const fileContent = credentialsOutput.join('\n');

    // 4. Save to files
    const dPath = 'D:/credentials.txt';
    const publicPath = path.join(process.cwd(), 'public', 'credentials.txt');

    fs.writeFileSync(dPath, fileContent, 'utf8');
    fs.writeFileSync(publicPath, fileContent, 'utf8');

    console.log('\n----------------------------------------');
    console.log(`CREDENTIALS GENERATED SUCCESSFULLY!`);
    console.log(`Saved to: ${dPath}`);
    console.log(`Saved to: ${publicPath}`);
    console.log('----------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error("Critical error in generation script:", err);
    process.exit(1);
  }
}

main();
