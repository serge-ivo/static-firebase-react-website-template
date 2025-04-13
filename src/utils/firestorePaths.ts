// Removed: import { FirestoreService } from "@serge-ivo/firestore-client";

// Centralized helper for Firestore paths
export const firestorePaths = {
  // Get the path for user document
  userDoc: (userId: string) => `users/${userId}`,
};
