import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  typography: {
    fontFamily: "Inter",
    htmlFontSize: 16,

    h1: {
      fontSize: "3.5rem",
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
