const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  getDocs, 
  writeBatch, 
  doc 
} = require('firebase/firestore');

// 1. Read .env.local to parse Firebase credentials
const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("Error: .env.local file not found. Run this from the project root.");
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

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('your-api-key')) {
  console.error("Error: Firebase credentials in .env.local are not configured.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Helper to extract row values using flexible matching
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

// 3. Helper to clean position and parse team & role
function parsePosition(positionStr) {
  if (!positionStr) return { team: 'Other', role: 'Volunteer' };
  
  const cleaned = positionStr.trim();
  
  const teamLeaderSuffixes = ['- Team Leader', '-Team Leader', ' - Team Leader', ' Team Leader'];
  const volunteerSuffixes = ['- Volunteer', '-Volunteer', ' - Volunteer', ' Volunteer'];
  
  for (const suffix of teamLeaderSuffixes) {
    if (cleaned.endsWith(suffix)) {
      let team = cleaned.slice(0, -suffix.length).trim();
      if (team === 'Event &Venue Committee') team = 'Event & Venue Committee';
      if (team.toLowerCase() === 'social media') team = 'Social Media';
      return { team, role: 'Team Leader' };
    }
  }
  
  for (const suffix of volunteerSuffixes) {
    if (cleaned.endsWith(suffix)) {
      let team = cleaned.slice(0, -suffix.length).trim();
      if (team === 'Event &Venue Committee') team = 'Event & Venue Committee';
      if (team.toLowerCase() === 'social media') team = 'Social Media';
      return { team, role: 'Volunteer' };
    }
  }
  
  let team = cleaned;
  if (team === 'Event &Venue Committee') team = 'Event & Venue Committee';
  if (team.toLowerCase() === 'social media') team = 'Social Media';
  return { team, role: cleaned };
}

// 4. Main Import Process
async function importVolunteers() {
  try {
    console.log(`Connecting to Firestore project: ${firebaseConfig.projectId}`);
    
    // Read the Excel workbook
    const excelPath = 'D:/Master List Aarambh.xlsx';
    console.log(`Reading Excel file from: ${excelPath}`);
    const workbook = XLSX.readFile(excelPath);
    const sheet1 = workbook.Sheets['Sheet1'];
    if (!sheet1) {
      throw new Error("Could not find 'Sheet1' in Excel workbook.");
    }

    const rawRows = XLSX.utils.sheet_to_json(sheet1);
    console.log(`Found ${rawRows.length} raw rows in Sheet1.`);

    const parsedVolunteers = [];
    const uniqueTeams = new Set();

    rawRows.forEach((row, index) => {
      const rawName = getRowValue(row, ['name']);
      const rawEmail = getRowValue(row, ['mail id', 'email']);
      const rawPosition = getRowValue(row, ['position']);
      
      if (!rawName || !rawEmail) {
        console.warn(`Row ${index + 2}: Skipping because name or email is missing.`, row);
        return;
      }

      const name = String(rawName).trim();
      const email = String(rawEmail).trim().toLowerCase();
      const rollNo = String(getRowValue(row, ['roll no']) || '').trim();
      const gender = String(getRowValue(row, ['gender']) || '').trim();
      const position = String(rawPosition || '').trim();
      
      const { team, role } = parsePosition(position);
      uniqueTeams.add(team);

      const mobileVal = getRowValue(row, ['mobile number', 'phone']);
      const mobile = mobileVal ? String(mobileVal).trim() : '';

      const hostelerVal = getRowValue(row, ['hostler/ day scholar', 'hosteler', 'scholar']);
      const hosteler = hostelerVal ? String(hostelerVal).trim() : '';

      const locationVal = getRowValue(row, ['jaipur/ non-jaipur', 'location']);
      const location = locationVal ? String(locationVal).trim() : '';

      parsedVolunteers.push({
        name,
        email,
        rollNo,
        gender,
        position,
        team,
        role,
        mobile,
        hosteler,
        location,
        updatedAt: new Date()
      });
    });

    console.log(`Parsed ${parsedVolunteers.length} valid volunteers.`);
    console.log('Normalized Teams found:', Array.from(uniqueTeams).sort());

    // Clean old volunteer documents
    console.log('Fetching existing volunteers collection from Firestore...');
    const volCollection = collection(db, 'volunteers');
    const snap = await getDocs(volCollection);
    
    if (!snap.empty) {
      console.log(`Deleting ${snap.size} existing volunteer documents...`);
      let deleteBatch = writeBatch(db);
      let count = 0;
      for (const d of snap.docs) {
        deleteBatch.delete(d.ref);
        count++;
        if (count % 400 === 0) {
          await deleteBatch.commit();
          deleteBatch = writeBatch(db);
        }
      }
      if (count % 400 !== 0) {
        await deleteBatch.commit();
      }
      console.log('Deleted old records successfully.');
    }

    // Write new volunteer documents in batches of 400
    console.log(`Uploading ${parsedVolunteers.length} volunteers to Firestore...`);
    let writeBatchCount = 0;
    let uploadBatch = writeBatch(db);
    
    for (let i = 0; i < parsedVolunteers.length; i++) {
      const volData = parsedVolunteers[i];
      const newDocRef = doc(volCollection);
      uploadBatch.set(newDocRef, volData);
      writeBatchCount++;

      if (writeBatchCount === 400) {
        await uploadBatch.commit();
        console.log(`Committed batch of 400 records (up to index ${i})...`);
        uploadBatch = writeBatch(db);
        writeBatchCount = 0;
      }
    }
    
    if (writeBatchCount > 0) {
      await uploadBatch.commit();
      console.log(`Committed final batch of ${writeBatchCount} records.`);
    }

    console.log('\n------------------------------------------------');
    console.log('SUCCESS! ALL VOLUNTEERS SUCCESSFULLY IMPORTED!');
    console.log(`Total Volunteers: ${parsedVolunteers.length}`);
    console.log(`Unique Teams:     ${uniqueTeams.size}`);
    console.log('------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('Error importing volunteers:', err);
    process.exit(1);
  }
}

importVolunteers();
