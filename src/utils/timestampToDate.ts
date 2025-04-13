import { Timestamp } from "firebase/firestore";

export const timestampToDate = (timestamp: Timestamp | Date): Date => {
  return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
};
