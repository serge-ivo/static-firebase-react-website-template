import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { auth, firestore } from "../services/firebaseConfig";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";

// Restore original AuthContext interface
export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithEmailPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Add back UserDocData interface
interface UserDocData {
  email: string | null;
  name: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLoggedInAt: Timestamp;
  applications: string[]; // Assuming this was part of the original structure
}

// Add back ensureUserDocument helper function
const ensureUserDocument = async (user: User) => {
  const userDocRef = doc(firestore, "users", user.uid);
  // Add back public doc reference if it was there (assuming yes for now)
  const userPubDocRef = doc(firestore, "usersPub", user.uid);
  try {
    const userDocSnap = await getDoc(userDocRef);

    const userData: UserDocData = {
      email: user.email,
      // Use displayName or default, ensure null checks if needed
      name: user.displayName || "Anonymous User",
      photoURL: user.photoURL,
      createdAt: userDocSnap.exists()
        ? userDocSnap.data().createdAt
        : Timestamp.now(),
      lastLoggedInAt: Timestamp.now(),
      // Ensure applications field handling is correct
      applications: userDocSnap.exists()
        ? userDocSnap.data().applications || []
        : [],
    };

    const publicUserData = {
      name: user.displayName || "Anonymous",
      photoURL: user.photoURL,
      email: user.email, // Assuming public doc had email
    };

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, userData);
      console.log("Created new user document in Firestore");
      // Add back public doc creation
      await setDoc(userPubDocRef, publicUserData);
      console.log("Created new public user document in Firestore");
    } else {
      // Update only specific fields to avoid overwriting createdAt or applications unintentionally
      await updateDoc(userDocRef, {
        lastLoggedInAt: userData.lastLoggedInAt,
        name: userData.name,
        photoURL: userData.photoURL,
        email: userData.email,
      });
      // Add back public doc update
      await updateDoc(userPubDocRef, publicUserData);
      console.log("Updated existing user document in Firestore");
    }
  } catch (error) {
    console.error("Error ensuring user document:", error);
    throw error; // Re-throw
  }
};

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Add back signInWithGoogle function
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await ensureUserDocument(user); // Ensure doc exists/is updated
      setCurrentUser(user); // Set current user after doc ensured
    } catch (error: any) {
      console.error("Error during Google sign-in:", error);
      // Don't throw error if user closes popup
      if (error?.code !== "auth/popup-closed-by-user") {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  // Add back signInWithGitHub function
  const signInWithGitHub = async () => {
    setLoading(true);
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await ensureUserDocument(user); // Ensure doc exists/is updated
      setCurrentUser(user); // Set current user after doc ensured
    } catch (error: any) {
      console.error("Error during GitHub sign-in:", error);
      // Don't throw error if user closes popup
      if (error?.code !== "auth/popup-closed-by-user") {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  // Add back signUpWithEmailPassword function
  const signUpWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Ensure user document is created immediately after signup
      await ensureUserDocument(user);
      setCurrentUser(user); // Set current user after doc ensured
    } catch (error) {
      console.error("Error during email/password signup:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add back signInWithEmailPassword function
  const signInWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Update user document on sign-in
      await ensureUserDocument(user);
      setCurrentUser(user); // Set current user after doc ensured
    } catch (error) {
      console.error("Error during email/password sign-in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function (kept)
  const logout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setCurrentUser(null); // Set user to null immediately
    } catch (error) {
      console.error("Error logging out:", error);
      throw error; // Re-throw error for potential handling upstream
    } finally {
      setLoading(false);
    }
  };

  // Add sendPasswordReset function
  const sendPasswordReset = async (email: string) => {
    // No loading state change here, as it's a quick operation
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully to:", email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error; // Re-throw error for handling in the component
    }
  };

  // Listen for auth state changes (restore ensureUserDocument call)
  useEffect(() => {
    setLoading(true); // Ensure loading is true when listener starts
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, ensure their Firestore doc is up-to-date
        try {
          await ensureUserDocument(user);
          setCurrentUser(user);
        } catch (error) {
          console.error(
            "Failed to ensure user document on auth state change:",
            error
          );
          // Optional: Decide how to handle this - maybe sign out the user?
          // await auth.signOut();
          // setCurrentUser(null);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoading(false); // Set loading to false after user state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Provide the context value (add sendPasswordReset)
  const value: AuthContextType = {
    currentUser,
    loading,
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    logout,
    sendPasswordReset,
  };

  // Remove loading indicator return, let consumers handle it if needed
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Helper hook to use the auth context (kept)
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
