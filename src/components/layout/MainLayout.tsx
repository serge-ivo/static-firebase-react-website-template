import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom"; // Import RouterLink
import { useAuth } from "../../contexts/AuthContext";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress, // For loading state
  IconButton, // Potentially for a user menu icon
  Menu, // For user dropdown menu
  MenuItem, // For user dropdown menu
  Avatar, // To display user avatar
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Top Bar with User Menu or Login Button
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
              {/* Display user avatar or initial */}
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
                src={currentUser.photoURL || undefined}
              >
                {/* Fallback to initials if no photoURL */}
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
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/dashboard"
              >
                Dashboard
              </MenuItem>
              {/* Add other menu items like Profile, Settings etc. */}
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

// Basic Footer Placeholder using MUI
const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2, // Padding top and bottom
        px: 2, // Padding left and right
        mt: "auto", // Push footer to bottom
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} My App Template
      </Typography>
    </Box>
  );
};

// Main Layout using MUI components
const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar />

      {/* Main Content Area */}
      {/* Use Container for consistent padding and max-width */}
      <Container component="main" sx={{ flex: 1, py: 3 }} maxWidth="lg">
        {" "}
        {/* Adjust py and maxWidth as needed */}
        <Outlet /> {/* Renders the matched child route component */}
      </Container>

      <Footer />

      {/* Toast Notifications Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Use colored theme which adapts better
      />
    </Box>
  );
};

export default MainLayout;
