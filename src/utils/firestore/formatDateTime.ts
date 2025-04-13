import { Timestamp, FieldValue } from "firebase/firestore";

/**
 * Formats a Firestore timestamp into a human-readable date and time.
 * @param timestamp - Firestore timestamp, FieldValue, or undefined.
 * @returns A formatted date-time string or "Pending" if timestamp is a FieldValue or "Unknown" if undefined.
 */
export const formatDateTime = (
  timestamp: Timestamp | { seconds: number; nanoseconds: number } | FieldValue | undefined
): string => {
  if (!timestamp) return "Unknown";

  // Handle FieldValue (e.g., serverTimestamp not yet resolved)
  if (!(timestamp instanceof Timestamp) && !("seconds" in timestamp)) {
    return "Pending"; // Indicates that the timestamp hasn't been resolved yet
  }

  // Handle Timestamp
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleString();
  }

  // Handle plain object with seconds and nanoseconds
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString();
};
