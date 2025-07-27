import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Optional: uncomment if needed

// --- IMPORTANT --- //
// Firebase configuration
// ---------------------------------------------------------------------------
// The template ships with public **production** credentials for the demo app
// so it works out-of-the-box.  They are safe to expose on the web. 
// If you want to use your own Firebase project, simply create a `.env` file and
// set the VITE_FIREBASE_* variables – those will automatically override the
// defaults below.

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCun6g1MT81QF4MuHxNRkRdvjZ8_Lyl4WA",
  authDomain: "static-web-template.firebaseapp.com",
  projectId: "static-web-template",
  storageBucket: "static-web-template.firebasestorage.app",
  messagingSenderId: "236204961289",
  appId: "1:236204961289:web:6f046864524c5b308c92d8",
  measurementId: "G-GT18PZBW8Y",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId,
};
// ----------------- //

// Optional: Log active Firebase project for quick sanity-check during startup
console.info(`Firebase project initialised: ${firebaseConfig.projectId}`);
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
