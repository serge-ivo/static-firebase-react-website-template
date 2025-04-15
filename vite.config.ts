import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ensure environment variables are properly replaced during build
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    // This ensures Vite replaces env variables in the build
    "process.env": {},
  },
});
