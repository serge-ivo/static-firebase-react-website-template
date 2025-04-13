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
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

// Top Bar Component extracted from MainLayout
const TopBar: React.FC = () => {
  const { currentUser, loading, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose(); // Close menu first
    try {
      await logout();
      console.log("Logged out successfully");
      // Navigation to /login will happen via PrivateRoute redirect
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast notification for logout failure
    }
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
          App Template
        </Typography>
        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : currentUser ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem disabled sx={{ fontWeight: "bold" }}>
                {currentUser.displayName || currentUser.email}
              </MenuItem>
              {/* Link to User Profile Page */}
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to={`/user/${currentUser.uid}`}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/dashboard"
              >
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
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
