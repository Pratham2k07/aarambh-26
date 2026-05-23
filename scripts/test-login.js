import { readFileSync } from 'fs';
import { join } from 'path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Read .env.local
const envPath = join(process.cwd(), '.env.local');
let envContent = '';
try {
  envContent = readFileSync(envPath, 'utf8');
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

const email = 'admin@aarambh.com';
const password = 'AdminPass123!';

async function testLogin() {
  try {
    console.log(`Attempting login for: ${email}...`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    console.log(`Success! Logged in. UID: ${uid}`);

    console.log(`Fetching role document for UID: ${uid}...`);
    const roleDoc = await getDoc(doc(db, 'roles', uid));
    if (roleDoc.exists()) {
      console.log(`Role document found:`, roleDoc.data());
    } else {
      console.log(`WARNING: Role document NOT found in Firestore 'roles' collection for UID: ${uid}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(`\nLogin failed!`);
    console.error(err);
    process.exit(1);
  }
}

testLogin();
