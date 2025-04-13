// import { FirestoreService, FirestoreModel } from "@serge-ivo/firestore-client";
// import { where, QueryConstraint } from "firebase/firestore";

/**
 * ✅ Defines User properties (without class methods).
 * This represents the data structure stored in Firestore.
 */
export type UserData = {
  name: string;
  email: string;
  resume?: string;
  createdAt: Date; // Expect JS Date object in application code
  updatedAt?: Date; // Expect JS Date object in application code
  gmailToken?: string;
  tokenExpiry?: number;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  location?: string;
  country?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  openAIKey?: string;
};

// Removed User class definition as it relied on FirestoreModel and FirestoreService
// export class User extends FirestoreModel { ... }
