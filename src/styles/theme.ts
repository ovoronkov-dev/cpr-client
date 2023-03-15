import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#439A86",
    },
    secondary: {
      main: "#007991",
    },
  },
  typography: {
    fontFamily: "Inter",
    htmlFontSize: 16,

    h1: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
