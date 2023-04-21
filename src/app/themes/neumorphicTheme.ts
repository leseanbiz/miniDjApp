import { createTheme } from "@mui/material/styles";

const neumorphicTheme = createTheme({
  palette: {
    primary: {
      main: "#4d4d4d",
    },
    secondary: {
      main: "#a8a8a8",
    },
    background: {
      default: "#f0f0f0",
      paper: "#e0e0e0",
    },
    text: {
      primary: "#f0f0f0",
      secondary: "#a8a8a8",
    },
  },
  customColors: null,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          },
          "&:active": {
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transform: "translateY(1px)",
          },
        },
        contained: {
          backgroundColor: "#f0f0f0",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
        outlined: {
          borderColor: "#a8a8a8",
          "&:hover": {
            borderColor: "#4d4d4d",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          },
        },
        elevation2: {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.1)",
          },
        },
        elevation3: {
          boxShadow: "0 16px 24px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 32px 48px rgba(0, 0, 0, 0.1)",
          },
        },
        elevation4: {
          boxShadow: "0 24px 32px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 48px 64px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
});

export default neumorphicTheme;
