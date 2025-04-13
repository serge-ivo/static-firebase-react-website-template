import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuthContext } from "../../hooks/useAuthContext";

interface LoginFormProps {
  onLoginSuccess?: () => void; // Callback for successful login
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmailPassword,
    signUpWithEmailPassword,
  } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleAuthAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent page refresh on button click

    try {
      if (!email || !password) {
        setSnackbar({
          open: true,
          message: "Email and password are required.",
          severity: "error",
        });
        return;
      }

      if (isSignUp) {
        console.log("Attempting sign up with email:", email);
        await signUpWithEmailPassword(email, password);
        setSnackbar({
          open: true,
          message: "Sign up successful!",
          severity: "success",
        });

        // Call the success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        console.log("Attempting login with email:", email);
        await signInWithEmailPassword(email, password);
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        // Call the success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleAuthMode = () => setIsSignUp((prev) => !prev);

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
        p: 3,
        boxShadow: 5,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {isSignUp ? "Create an Account" : "Welcome Back"}
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 2, textTransform: "none" }}
        onClick={signInWithGoogle}
        startIcon={<GoogleIcon />}
      >
        {isSignUp ? "Sign Up" : "Login"} with Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 2, textTransform: "none" }}
        onClick={signInWithGitHub}
        startIcon={<GitHubIcon />}
      >
        {isSignUp ? "Sign Up" : "Login"} with GitHub
      </Button>

      <Divider sx={{ my: 2 }}>or</Divider>

      <FormControl fullWidth>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, textTransform: "none" }}
        onClick={handleAuthAction}
      >
        {isSignUp ? "Sign Up" : "Login"}
      </Button>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
        onClick={toggleAuthMode}
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </Typography>

      {/* Snackbar for error or success messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
