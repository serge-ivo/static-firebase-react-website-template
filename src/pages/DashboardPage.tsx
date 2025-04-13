import React from "react";
import { Typography, Container } from "@mui/material";

const DashboardPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your dashboard. This page is protected and only visible when
        you are logged in.
      </Typography>
      {/* Add dashboard widgets and components here */}
    </Container>
  );
};

export default DashboardPage;
