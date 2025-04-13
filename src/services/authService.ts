import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";

class AuthService {
  private auth = getAuth();

  /**
   * Signs in a user using email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves with the signed-in user.
   */
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return userCredential.user;
  }

  /**
   * Signs out the currently signed-in user.
   */
  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  /**
   * Creates a new user with email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves with the newly created user.
   */
  async signUpWithEmail(email: string, password: string): Promise<User> {
    const result = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return result.user;
  }

  /**
   * Sends a password reset email to the user.
   * @param email - The user's email.
   */
  async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Signs in a user with a third-party provider (Google or GitHub).
   * @param provider - The authentication provider to use (Google or GitHub).
   * @returns A promise that resolves with the signed-in user.
   */
  async signInWithProvider(
    provider: GoogleAuthProvider | GithubAuthProvider
  ): Promise<User> {
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  /**
   * Registers a callback to be called when the auth state changes.
   * @param callback - A function that receives the user or null.
   * @returns A function to unsubscribe from the auth state listener.
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  /**
   * Reauthenticates a user with a provider.
   * @param user - The current user.
   * @param provider - The provider to use for reauthentication.
   */
  async reauthenticateWithProvider(
    user: User,
    provider: GoogleAuthProvider
  ): Promise<void> {
    await reauthenticateWithPopup(user, provider);
  }

  /**
   * Gets the currently signed-in user.
   * @returns The currently signed-in user, or null if no user is signed in.
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Deletes the currently signed-in user.
   * @returns A promise that resolves when the user is deleted.
   */
  async deleteCurrentUser(): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error("No user is currently signed in.");

    try {
      await currentUser.delete();
      console.log("User account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user account:", error);
      if ((error as any).code === "auth/requires-recent-login") {
        throw new Error("Reauthentication required.");
      } else {
        throw error;
      }
    }
  }

  /**
   * Reauthenticates the currently signed-in user if needed.
   * @param provider - The provider to use for reauthentication.
   */
  async reauthenticateCurrentUser(provider: GoogleAuthProvider): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error("No user is currently signed in.");

    await this.reauthenticateWithProvider(currentUser, provider);
  }
}

export default AuthService;
