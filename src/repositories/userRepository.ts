import { firestore } from "../services/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  DocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { firestorePaths } from "../utils/firestorePaths";
import { UserData } from "../models/user";

function getDataFromSnapshot<T extends { createdAt?: any; updatedAt?: any }>(
  snapshot: DocumentSnapshot<DocumentData>
): T | null {
  if (!snapshot.exists()) {
    return null;
  }
  const rawData = snapshot.data();
  const data = { ...rawData };

  if (data.createdAt && data.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data.updatedAt && data.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toDate();
  }

  return {
    id: snapshot.id,
    ...(data as Omit<T, "id">),
  } as unknown as T;
}

function convertDatesToTimestamps<
  T extends { createdAt?: any; updatedAt?: any },
>(data: T): T {
  const dataToSave = { ...data };
  if (dataToSave.createdAt && dataToSave.createdAt instanceof Date) {
    dataToSave.createdAt = Timestamp.fromDate(dataToSave.createdAt);
  }
  if (dataToSave.updatedAt && dataToSave.updatedAt instanceof Date) {
    dataToSave.updatedAt = Timestamp.fromDate(dataToSave.updatedAt);
  }
  delete (dataToSave as any).id;
  return dataToSave;
}

export const UserRepository = {
  async getUser(userId: string): Promise<(UserData & { id: string }) | null> {
    const docRef = doc(firestore, firestorePaths.userDoc(userId));
    const docSnap = await getDoc(docRef);
    return getDataFromSnapshot<UserData & { id: string }>(docSnap);
  },

  async createUser(userId: string, userData: UserData): Promise<void> {
    const docRef = doc(firestore, firestorePaths.userDoc(userId));
    const dataToSave = convertDatesToTimestamps(userData);
    await setDoc(docRef, dataToSave);
  },

  async updateUser(userId: string, data: Partial<UserData>): Promise<void> {
    const docRef = doc(firestore, firestorePaths.userDoc(userId));
    const dataToUpdate = convertDatesToTimestamps(data);
    await updateDoc(docRef, dataToUpdate);
  },

  async deleteUser(userId: string): Promise<void> {
    const docRef = doc(firestore, firestorePaths.userDoc(userId));
    await deleteDoc(docRef);
  },
};
