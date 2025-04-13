import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const {
    signInWithEmailPassword,
    signInWithGoogle,
    signInWithGitHub,
    currentUser,
    loading: authLoading,
  } = useAuth();
  const navigate = useNavigate();

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
  );
};

export default LoginPage;
