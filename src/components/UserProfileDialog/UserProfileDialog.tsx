import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleAuthProvider } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthService from "../../services/authService";

interface UserProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

interface UserPublicData {
  name?: string;
  email?: string;
  photoURL?: string;
  linkedin?: string;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  onClose,
}) => {
  const { currentUser: user, loading: authLoading } = useAuth();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserPublicData | null>(null);
  const [fetchingData, setFetchingData] = useState(false);
  const authService = new AuthService();
  const navigate = useNavigate();

  // Clear error when dialog opens or closes
  useEffect(() => {
    setError(null);
  }, [open]);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      onClose();
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      setLoading(true);
      setError(null);
      try {
        await authService.deleteCurrentUser();
        console.log("User account deleted successfully.");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting user account:", error);
        if ((error as any).message === "Reauthentication required.") {
          try {
            await authService.reauthenticateCurrentUser(
              new GoogleAuthProvider()
            );
            await authService.deleteCurrentUser();
            console.log(
              "User account deleted successfully after reauthentication."
            );
            navigate("/login");
          } catch (reauthError) {
            console.error("Error after reauthentication:", reauthError);
            setError("Failed to delete account. Please try again later.");
          }
        } else {
          setError("Failed to delete account. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError("No user is signed in.");
    }
  };

  if (!user) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unable to load profile. Please sign in again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent dividers>
        {(loading || fetchingData) && (
          <CircularProgress size={24} sx={{ mr: 1 }} />
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Name:</Typography>
          <Typography variant="body1" gutterBottom>
            {userData?.name || "N/A"}
          </Typography>

          <Typography variant="subtitle1">Email:</Typography>
          <Typography variant="body1" gutterBottom>
            {userData?.email || user.email || "N/A"}
          </Typography>

          <Typography variant="subtitle1">LinkedIn:</Typography>
          <Typography variant="body1" gutterBottom>
            {userData?.linkedin || "N/A"}
          </Typography>

          <Typography variant="caption">
            User ID: {user?.uid || "N/A"}
          </Typography>
        </Box>

        <Button
          onClick={handleSignOut}
          color="inherit"
          sx={{ mt: 2 }}
          disabled={loading || fetchingData}
        >
          Sign Out
        </Button>
        <Button
          onClick={() => setShowDeleteAccount(!showDeleteAccount)}
          color="error"
          variant="outlined"
          sx={{ mt: 2, ml: 1 }}
          disabled={loading || fetchingData}
        >
          Delete Account
        </Button>
        {showDeleteAccount && (
          <Box
            mt={2}
            border={1}
            borderColor="error.main"
            p={2}
            borderRadius={1}
          >
            <Typography variant="body2" color="error" gutterBottom>
              This action is permanent and cannot be undone.
            </Typography>
            <DialogContentText sx={{ mb: 1 }}>
              To confirm deletion, please type 'delete my account' below:
            </DialogContentText>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="delete my account"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              sx={{ my: 1 }}
              disabled={loading || fetchingData}
              size="small"
            />
            <Button
              fullWidth
              onClick={handleDeleteAccount}
              color="error"
              variant="contained"
              disabled={
                loading ||
                fetchingData ||
                deleteConfirmationText !== "delete my account"
              }
              sx={{ mt: 1 }}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                "Confirm Account Deletion"
              )}
            </Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading || fetchingData}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
