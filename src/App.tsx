import { Route, Routes } from "react-router";
import { Home } from "~views/Home/Home";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from "~styles/theme";
import { Polls } from "~views/Polls/Polls";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls" element={<Polls />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
