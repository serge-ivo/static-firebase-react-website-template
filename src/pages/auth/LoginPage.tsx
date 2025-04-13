import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Stack,
  Link,
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ResetPasswordModal from "../login/ResetPasswordModal";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resetError, setResetError] = useState<string | null>(null);
  const {
    signInWithEmailPassword,
    signInWithGoogle,
    signInWithGitHub,
    sendPasswordReset,
    currentUser,
    loading: authLoading,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLinkSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsLinkSent(false);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLinkSent, timer]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailPassword(email, password);
      // Redirect handled by PrivateRoute
    } catch (err: any) {
      console.error("Email Login failed:", err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSocialLoading("google");
    try {
      await signInWithGoogle();
      // Redirect handled by PrivateRoute
    } catch (err) {
      console.error("Google Sign-in failed:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGitHubSignIn = async () => {
    setError(null);
    setSocialLoading("github");
    try {
      await signInWithGitHub();
      // Redirect handled by PrivateRoute
    } catch (err) {
      console.error("GitHub Sign-in failed:", err);
      setError("Failed to sign in with GitHub. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleOpenResetModal = () => {
    setResetEmail(email);
    setResetError(null);
    setIsLinkSent(false);
    setTimer(0);
    setResetModalOpen(true);
  };

  const handleCloseResetModal = () => {
    setResetModalOpen(false);
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setResetError("Please enter your email address.");
      return;
    }
    setResetError(null);
    setLoading(true);
    try {
      await sendPasswordReset(resetEmail);
      setIsLinkSent(true);
      setTimer(30);
    } catch (err: any) {
      console.error("Password Reset failed:", err);
      if (err.code === "auth/user-not-found") {
        setResetError("No account found with this email address.");
      } else {
        setResetError("Failed to send password reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleEmailSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || !!socialLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || !!socialLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !!socialLoading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={handleOpenResetModal}
                  sx={{ cursor: "pointer" }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ width: "100%", my: 2 }}>OR</Divider>

          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading || !!socialLoading}
              sx={{ justifyContent: "center" }}
            >
              {socialLoading === "google" ? (
                <CircularProgress size={24} />
              ) : (
                "Sign in with Google"
              )}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={handleGitHubSignIn}
              disabled={loading || !!socialLoading}
              sx={{ justifyContent: "center" }}
            >
              {socialLoading === "github" ? (
                <CircularProgress size={24} />
              ) : (
                "Sign in with GitHub"
              )}
            </Button>
          </Stack>
        </Box>
      </Container>

      <ResetPasswordModal
        isOpen={resetModalOpen}
        onClose={handleCloseResetModal}
        email={resetEmail}
        onEmailChange={(e) => setResetEmail(e.target.value)}
        onResetPassword={handleResetPassword}
        isLinkSent={isLinkSent}
        timer={timer}
        errorMessage={resetError}
      />
    </>
  );
};

export default LoginPage;
