import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

interface ErrorPageProps {
  message?: string; // Custom error message
  redirectPath?: string; // Path to redirect (default to '/')
  buttonText?: string; // Button text (default to 'Go Home')
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "Oops! Something went wrong.",
  redirectPath = "/",
  buttonText = "Go Home",
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectPath);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        py: 4,
      }}
    >
      <Typography variant="h2" component="h1" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {message}
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          size="large"
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
