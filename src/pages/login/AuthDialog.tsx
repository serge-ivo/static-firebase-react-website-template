import React from "react";
import { Box, Container } from "@mui/material";
import LoginForm from "./LoginForm";
import WelcomeSection from "./WelcomeSection";
import { useNavigate, useLocation } from "react-router-dom";
import Background from "./Background";

interface AuthDialogProps {
  redirectPath?: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ redirectPath = "/" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use the redirectPath passed as a prop or fall back to the location state
  const pathToRedirect = redirectPath || location.state?.from?.pathname || "/";

  const handleLoginSuccess = () => {
    navigate(pathToRedirect, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        margin: 0,
        padding: 0,
      }}
    >
      <Background />
      <Container
        sx={{
          zIndex: 1,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          maxWidth: "md",
        }}
      >
        <WelcomeSection />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Container>
    </Box>
  );
};

export default AuthDialog;

// import React from "react";
// import { Box, Container } from "@mui/material";
// import LoginForm from "./LoginForm";
// import WelcomeSection from "./WelcomeSection";
// import FlyingStarsBackground from "./FlyingStarsBackground";

// const LoginPage: React.FC = () => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100vw",
//         overflow: "hidden",
//         position: "relative",
//         color: "white",
//       }}
//     >
//       <FlyingStarsBackground />
//       <Container
//         sx={{
//           zIndex: 1,
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 2,
//           maxWidth: { xs: "100%", sm: "md" },
//         }}
//       >
//         <WelcomeSection />
//         <LoginForm />
//       </Container>
//     </Box>
//   );
// };

// export default LoginPage;

// // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // import GitHubIcon from "@mui/icons-material/GitHub";
// // import GoogleIcon from "@mui/icons-material/Google";
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Divider,
// //   FormControl,
// //   IconButton,
// //   InputAdornment,
// //   TextField,
// //   Typography,
// //   useTheme,
// // } from "@mui/material";
// // import React, { useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuthContext } from "../../hooks/useAuthContext";

// // interface LoginPageProps {
// //   redirectPath?: string;
// // }

// // const LoginPage: React.FC<LoginPageProps> = ({ redirectPath = "/" }) => {
// //   const {
// //     signInWithGoogle,
// //     signInWithGitHub,
// //     signInWithEmailPassword,
// //     signUpWithEmailPassword,
// //   } = useAuthContext();
// //   const navigate = useNavigate();
// //   const [showPassword, setShowPassword] = React.useState(false);
// //   const [email, setEmail] = React.useState("");
// //   const [password, setPassword] = React.useState("");
// //   const [isSignUp, setIsSignUp] = React.useState(false);
// //   const theme = useTheme();
// //   const canvasRef = useRef<HTMLCanvasElement | null>(null);

// //   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

// //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
// //     setEmail(e.target.value);

// //   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
// //     setPassword(e.target.value);

// //   const handleSignInWithEmailPassword = async () => {
// //     try {
// //       await signInWithEmailPassword(email, password);
// //       navigate(redirectPath);
// //     } catch (error) {
// //       console.error("Error signing in:", error);
// //     }
// //   };

// //   const handleSignUpWithEmailPassword = async () => {
// //     try {
// //       await signUpWithEmailPassword(email, password);
// //       navigate(redirectPath);
// //     } catch (error) {
// //       console.error("Error signing up:", error);
// //     }
// //   };

// //   const handleGoogleSignIn = async () => {
// //     try {
// //       await signInWithGoogle();
// //       navigate(redirectPath);
// //     } catch (error) {
// //       console.error("Error during Google sign-in:", error);
// //     }
// //   };

// //   const handleGithubSignIn = async () => {
// //     try {
// //       await signInWithGitHub();
// //       navigate(redirectPath);
// //     } catch (error) {
// //       console.error("Error during GitHub sign-in:", error);
// //     }
// //   };

// //   // Flying stars background effect
// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const stars: { x: number; y: number; radius: number; speed: number }[] = [];
// //     const starCount = 100;

// //     for (let i = 0; i < starCount; i++) {
// //       stars.push({
// //         x: Math.random() * canvas.width,
// //         y: Math.random() * canvas.height,
// //         radius: Math.random() * 1.5,
// //         speed: Math.random() * 0.5 + 0.2,
// //       });
// //     }

// //     const draw = () => {
// //       if (!ctx || !canvas) return;
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);

// //       stars.forEach((star) => {
// //         ctx.beginPath();
// //         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
// //         ctx.fillStyle = "white";
// //         ctx.fill();
// //         star.y += star.speed;
// //         if (star.y > canvas.height) star.y = 0;
// //       });

// //       requestAnimationFrame(draw);
// //     };

// //     draw();
// //   }, []);

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         width: "100vw",
// //         backgroundColor: "black",
// //         overflow: "hidden",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         position: "relative",
// //         color: "white",
// //       }}
// //     >
// //       <canvas
// //         ref={canvasRef}
// //         style={{
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           width: "100%",
// //           height: "100%",
// //           zIndex: 0,
// //         }}
// //       ></canvas>
// //       <Container
// //         sx={{
// //           zIndex: 1,
// //           display: "flex",
// //           flexDirection: { xs: "column", sm: "row" },
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           gap: 2,
// //           maxWidth: { xs: "100%", sm: "md" },
// //         }}
// //       >
// //         <Box sx={{ flex: 1, textAlign: "center", p: 2 }}>
// //           <Typography
// //             variant="h2"
// //             sx={{
// //               fontFamily: "'Orbitron', sans-serif",
// //               color: "white",
// //               mb: 2,
// //             }}
// //           >
// //             Welcome to Seed Start
// //           </Typography>
// //           <Typography
// //             variant="h6"
// //             sx={{ color: "white", opacity: 0.8, fontStyle: "italic" }}
// //           >
// //             Where ideas take flight.
// //           </Typography>
// //         </Box>

// //         <Box
// //           sx={{
// //             flex: 1,
// //             backgroundColor: theme.palette.background.paper,
// //             borderRadius: theme.shape.borderRadius,
// //             p: 3,
// //             boxShadow: 5,
// //             zIndex: 1,
// //           }}
// //         >
// //           <FormControl fullWidth>
// //             <TextField
// //               label="Email"
// //               variant="outlined"
// //               value={email}
// //               onChange={handleEmailChange}
// //               margin="normal"
// //             />
// //             <TextField
// //               label="Password"
// //               type={showPassword ? "text" : "password"}
// //               variant="outlined"
// //               value={password}
// //               onChange={handlePasswordChange}
// //               margin="normal"
// //               InputProps={{
// //                 endAdornment: (
// //                   <InputAdornment position="end">
// //                     <IconButton onClick={togglePasswordVisibility} edge="end">
// //                       {showPassword ? <VisibilityOff /> : <Visibility />}
// //                     </IconButton>
// //                   </InputAdornment>
// //                 ),
// //               }}
// //             />
// //           </FormControl>
// //           <Button
// //             fullWidth
// //             variant="contained"
// //             sx={{ mt: 2, textTransform: "none" }}
// //             onClick={
// //               isSignUp
// //                 ? handleSignUpWithEmailPassword
// //                 : handleSignInWithEmailPassword
// //             }
// //           >
// //             {isSignUp ? "Sign Up" : "Login"}
// //           </Button>

// //           <Divider sx={{ my: 2, color: "white" }}>or</Divider>

// //           <Button
// //             fullWidth
// //             variant="outlined"
// //             sx={{ mt: 2, textTransform: "none" }}
// //             onClick={handleGoogleSignIn}
// //             startIcon={<GoogleIcon />}
// //           >
// //             {isSignUp ? "Sign Up" : "Login"} with Google
// //           </Button>

// //           <Button
// //             fullWidth
// //             variant="outlined"
// //             sx={{ mt: 2, textTransform: "none" }}
// //             onClick={handleGithubSignIn}
// //             startIcon={<GitHubIcon />}
// //           >
// //             {isSignUp ? "Sign Up" : "Login"} with GitHub
// //           </Button>
// //         </Box>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default LoginPage;

// // // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // // import GitHubIcon from "@mui/icons-material/GitHub";
// // // import GoogleIcon from "@mui/icons-material/Google";
// // // import {
// // //   Box,
// // //   Button,
// // //   Container,
// // //   Divider,
// // //   FormControl,
// // //   IconButton,
// // //   InputAdornment,
// // //   TextField,
// // //   Typography,
// // //   useTheme,
// // // } from "@mui/material";
// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuthContext } from "../../hooks/useAuthContext";

// // // interface LoginPageProps {
// // //   redirectPath?: string;
// // // }

// // // const LoginPage: React.FC<LoginPageProps> = ({ redirectPath = "/" }) => {
// // //   const {
// // //     signInWithGoogle,
// // //     signInWithGitHub,
// // //     signInWithEmailPassword,
// // //     signUpWithEmailPassword,
// // //   } = useAuthContext();
// // //   const navigate = useNavigate();
// // //   const [showPassword, setShowPassword] = React.useState(false);
// // //   const [email, setEmail] = React.useState("");
// // //   const [password, setPassword] = React.useState("");
// // //   const [isSignUp, setIsSignUp] = React.useState(false);
// // //   const theme = useTheme();

// // //   const togglePasswordVisibility = () => {
// // //     setShowPassword((prev) => !prev);
// // //   };

// // //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setEmail(e.target.value);
// // //   };

// // //   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setPassword(e.target.value);
// // //   };

// // //   const handleSignInWithEmailPassword = async () => {
// // //     try {
// // //       await signInWithEmailPassword(email, password);
// // //       navigate("/dashboard");
// // //     } catch (error) {
// // //       console.error("Error signing in:", error);
// // //     }
// // //   };

// // //   const handleSignUpWithEmailPassword = async () => {
// // //     try {
// // //       await signUpWithEmailPassword(email, password);
// // //       navigate("/dashboard");
// // //     } catch (error) {
// // //       console.error("Error signing up:", error);
// // //     }
// // //   };

// // //   const handleGoogleSignIn = async () => {
// // //     try {
// // //       await signInWithGoogle();
// // //       navigate(redirectPath); // Navigate to the originally requested path
// // //     } catch (error) {
// // //       console.error("Error during Google sign-in:", error);
// // //     }
// // //   };

// // //   const handleGithubSignIn = async () => {
// // //     try {
// // //       await signInWithGitHub();
// // //       navigate("/dashboard");
// // //     } catch (error) {
// // //       console.error("Error during GitHub sign-in:", error);
// // //     }
// // //   };

// // //   return (
// // //     <Box
// // //       sx={{
// // //         minHeight: "100vh",
// // //         width: "100vw",
// // //         backgroundColor: theme.palette.background.default,
// // //         display: "flex",
// // //         alignItems: "center",
// // //         justifyContent: "center",
// // //         p: 2,
// // //       }}
// // //     >
// // //       <Container
// // //         sx={{
// // //           display: "flex",
// // //           flexDirection: { xs: "column", sm: "row" },
// // //           justifyContent: "space-between",
// // //           alignItems: "center",
// // //           gap: 2,
// // //           maxWidth: { xs: "100%", sm: "md" },
// // //         }}
// // //       >
// // //         <Box
// // //           sx={{
// // //             flex: 1,
// // //             textAlign: "center",
// // //             p: theme.spacing(2),
// // //             order: { xs: 2, sm: 1 },
// // //           }}
// // //         >
// // //           <Typography
// // //             variant="h4"
// // //             sx={{
// // //               color: theme.palette.primary.main,
// // //               mb: theme.spacing(2),
// // //             }}
// // //           >
// // //             Seed Start
// // //           </Typography>
// // //           <Typography
// // //             variant="body1"
// // //             sx={{ display: { xs: "none", sm: "block" }, mb: theme.spacing(2) }}
// // //           >
// // //             Where startups are born.
// // //           </Typography>
// // //         </Box>

// // //         <Box
// // //           sx={{
// // //             flex: 1,
// // //             backgroundColor: theme.palette.background.paper,
// // //             borderRadius: theme.shape.borderRadius,
// // //             p: theme.spacing(3),
// // //             boxShadow: 3,
// // //             order: { xs: 1, sm: 2 },
// // //           }}
// // //         >
// // //           <FormControl fullWidth>
// // //             <TextField
// // //               label="Email"
// // //               variant="outlined"
// // //               value={email}
// // //               onChange={handleEmailChange}
// // //               margin="normal"
// // //             />
// // //             <TextField
// // //               label="Password"
// // //               type={showPassword ? "text" : "password"}
// // //               variant="outlined"
// // //               value={password}
// // //               onChange={handlePasswordChange}
// // //               margin="normal"
// // //               InputProps={{
// // //                 endAdornment: (
// // //                   <InputAdornment position="end">
// // //                     <IconButton onClick={togglePasswordVisibility} edge="end">
// // //                       {showPassword ? <VisibilityOff /> : <Visibility />}
// // //                     </IconButton>
// // //                   </InputAdornment>
// // //                 ),
// // //               }}
// // //             />
// // //           </FormControl>
// // //           <Button
// // //             fullWidth
// // //             variant="contained"
// // //             sx={{ mt: 2, textTransform: "none" }}
// // //             onClick={
// // //               isSignUp
// // //                 ? handleSignUpWithEmailPassword
// // //                 : handleSignInWithEmailPassword
// // //             }
// // //           >
// // //             {isSignUp ? "Sign Up" : "Login"}
// // //           </Button>

// // //           <Divider sx={{ my: 2 }}>or</Divider>

// // //           <Button
// // //             fullWidth
// // //             variant="outlined"
// // //             sx={{ mt: 2, textTransform: "none" }}
// // //             onClick={handleGoogleSignIn}
// // //             startIcon={<GoogleIcon />}
// // //           >
// // //             {isSignUp ? "Sign Up" : "Login"} with Google
// // //           </Button>

// // //           <Button
// // //             fullWidth
// // //             variant="outlined"
// // //             sx={{ mt: 2, textTransform: "none" }}
// // //             onClick={handleGithubSignIn}
// // //             startIcon={<GitHubIcon />}
// // //           >
// // //             {isSignUp ? "Sign Up" : "Login"} with GitHub
// // //           </Button>
// // //         </Box>
// // //       </Container>
// // //     </Box>
// // //   );
// // // };

// // // export default LoginPage;
