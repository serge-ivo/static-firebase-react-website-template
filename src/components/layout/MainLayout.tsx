import React from "react";
import { Outlet } from "react-router-dom"; // Keep Outlet
// Removed TopBar specific imports (useAuth, Link, AppBar, Toolbar, etc.)
import {
  Container,
  Box,
  Typography,
  // Removed AppBar, Toolbar, Button, CircularProgress, IconButton, Menu, MenuItem, Avatar
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./TopBar"; // Import the new TopBar component

// Removed inline TopBar component definition

// Basic Footer Placeholder using MUI (Keep as is)
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
      {/* Use the imported TopBar component */}
      <TopBar />

      {/* Main Content Area */}
      <Container component="main" sx={{ flex: 1, py: 3 }} maxWidth="lg">
        <Outlet />
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
        theme="colored"
      />
    </Box>
  );
};

export default MainLayout;
