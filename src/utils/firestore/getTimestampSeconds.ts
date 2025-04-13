
import { Timestamp, FieldValue } from "firebase/firestore";

/**
 * Safely extracts the seconds from a Firestore Timestamp.
 * @param createdAt - The timestamp field, which can be a Timestamp, FieldValue, or undefined.
 * @returns The seconds value or 0 if unavailable.
 */
export const getTimestampSeconds = (
  createdAt: Timestamp | FieldValue | null | undefined
): number => {
  if (!createdAt) return 0;

  // Check if the value is a Timestamp
  if (createdAt instanceof Timestamp) {
    return createdAt.seconds;
  }

  // If it's a FieldValue (e.g., serverTimestamp), return 0 as it isn't resolved yet
  return 0;
};
