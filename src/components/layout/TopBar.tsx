import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Avatar,
} from "@mui/material";
import UserProfileDialog from "../UserProfileDialog/UserProfileDialog";
import { APP_TITLE } from "../../config";

// Top Bar Component extracted from MainLayout
const TopBar: React.FC = () => {
  const { currentUser, loading, logout } = useAuth();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleAvatarClick = () => {
    setDialogOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      // Navigation to /login will happen via PrivateRoute redirect
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast notification for logout failure
    }
  };

  const handleCloseProfileDialog = () => {
    setDialogOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        >
          {APP_TITLE}
        </Typography>
        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : currentUser ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={handleAvatarClick}
              color="inherit"
            >
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
                src={currentUser.photoURL || undefined}
              >
                {currentUser.displayName
                  ? currentUser.displayName.charAt(0).toUpperCase()
                  : currentUser.email?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <UserProfileDialog
              open={dialogOpen}
              userId={currentUser.uid}
              onClose={handleCloseProfileDialog}
            />
          </div>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
