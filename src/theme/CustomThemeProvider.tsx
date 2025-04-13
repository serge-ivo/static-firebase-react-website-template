import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4", // Vibrant teal for primary buttons and highlights
    },
    secondary: {
      main: "#ff4081", // Bright pink for secondary actions
    },
    background: {
      default: "#121212", // Rich dark background
      paper: "#1e1e1e", // Slightly lighter for contrast
    },
    text: {
      primary: "#ffffff", // Crisp white text
      secondary: "#bdbdbd", // Muted gray for secondary text
    },
    divider: "#424242", // Subtle dividers
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Clean, modern font
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      color: "#ffffff",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      color: "#bdbdbd",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#bdbdbd",
    },
    button: {
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 188, 212, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1c",
          boxShadow: "none",
          borderBottom: "1px solid #424242",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#424242",
            },
            "&:hover fieldset": {
              borderColor: "#00bcd4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00bcd4",
            },
          },
        },
      },
    },
  },
});

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default CustomThemeProvider;
