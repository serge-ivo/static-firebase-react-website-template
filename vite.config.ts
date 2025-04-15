/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    __FIREBASE_CONFIG__: {
      apiKey: JSON.stringify(import.meta.env.VITE_FIREBASE_API_KEY),
      authDomain: JSON.stringify(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
      projectId: JSON.stringify(import.meta.env.VITE_FIREBASE_PROJECT_ID),
      storageBucket: JSON.stringify(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
      messagingSenderId: JSON.stringify(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      appId: JSON.stringify(import.meta.env.VITE_FIREBASE_APP_ID),
      measurementId: JSON.stringify(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
    },
  },
});
