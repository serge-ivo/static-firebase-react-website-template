import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Optional: uncomment if needed

// --- IMPORTANT --- //
// Firebase configuration is loaded from environment variables.
// Create a .env file in the root directory (copy from .env.example)
// and replace the placeholder values with your actual Firebase project configuration.
declare const __FIREBASE_CONFIG__: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

const firebaseConfig = __FIREBASE_CONFIG__;
// ----------------- //

// Debug: Log which environment variables are present (without their values)
type FirebaseConfigKey = keyof typeof firebaseConfig;
const configKeys = Object.keys(firebaseConfig) as FirebaseConfigKey[];

console.log('Firebase config keys present:', configKeys.filter(key => firebaseConfig[key]));

// Basic validation to ensure variables are loaded
const missingVars = Object.entries(firebaseConfig)
  .filter(([key]) => key !== 'measurementId') // measurementId is optional
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error(
    'Missing required Firebase configuration variables:',
    missingVars.join(', ')
  );
  throw new Error('Firebase configuration is incomplete. Check the console for details.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// Initialize Analytics (optional)
// const analytics = getAnalytics(app);

// Export auth and firestore instances
export const auth = getAuth(app);
export const firestore = db;
