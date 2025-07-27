import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import UserProfileDetailsCard from "../../pages/UserProfile/UserProfileDetailsCard";

interface UserProfileDialogProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  userId,
  onClose,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEditProfile = () => {
    onClose();
    navigate(`/user/${userId}/edit`);
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Profile
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Reuse existing card for consistency */}
        <UserProfileDetailsCard userId={userId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditProfile}>Edit Profile</Button>
        <Button onClick={handleLogout} color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
