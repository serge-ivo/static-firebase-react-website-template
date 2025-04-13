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
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Optional
};
// ----------------- //

// Basic validation to ensure variables are loaded
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    "Firebase configuration variables (VITE_FIREBASE_...) are missing. Make sure you have a .env file with the correct values."
  );
  // Optionally throw an error or display a message to the user
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
