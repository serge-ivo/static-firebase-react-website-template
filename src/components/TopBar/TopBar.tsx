import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserMenu from "../UserMenu/UserMenu";
import { useNavigate } from "react-router-dom";

export interface TopBarProps {
  onModeChange: (mode: string) => void;
  mode: string;
}

const TopBar: React.FC<TopBarProps> = ({ onModeChange }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleNavigateSearch = () => {
    navigate("/search"); // Redirect to the dashboard
  };

  const handleNavigateSettings = () => {
    navigate("/settings"); // Redirect to the dashboard
  };

  const handleNavigateEmail = () => {
    navigate("/email"); // Redirect to the dashboard
  };

  const handleNavigateApply = () => {
    navigate("/apply"); // Redirect to the apply page
  };

  const handleNavigateInterview = () => {
    navigate("/interview"); // Redirect to the interview page
  };

  const handleNavigateMyProfile = () => {
    if (currentUser) {
      navigate(`/user/${currentUser.uid}`); // Redirect to the logged-in user's profile
    }
  };

  const handleNavigateMessages = () => {
    navigate("/messages"); // Redirect to the dashboard
  };

  return (
    <AppBar position="static" elevation={4}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          backgroundColor: "primary.dark",
        }}
      >
        {/* Left Section: Brand Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h5"
            onClick={handleNavigateApply}
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              color: "secondary.main",
            }}
          >
            Job Search Works
          </Typography>
          <Button variant="text" color="inherit" onClick={handleNavigateSearch}>
            Search
          </Button>
          <Button variant="text" color="inherit" onClick={handleNavigateApply}>
            Apply
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={handleNavigateInterview}
          >
            Interview
          </Button>
        </Box>

        {/* Right Section: User Menu and Actions */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleNavigateEmail}
          >
            Email
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleNavigateSettings}
          >
            Settings
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleNavigateMessages}
          >
            Messages
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleNavigateMyProfile}
            disabled={!currentUser}
          >
            My Profile
          </Button>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
