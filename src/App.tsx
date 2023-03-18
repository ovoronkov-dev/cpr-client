import { Route, Routes } from "react-router";
import { Home } from "~views/Home/Home";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from "~styles/theme";
import { Polls } from "~views/Polls/Polls";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { Layout } from "~components/Layout";
import { PollViewer } from "~views/PollViewer/PollViewer";
import { Playground } from "~views/Playground/Playground";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/polls" element={<Polls />} />
            <Route path="/polls/:id" element={<PollViewer />} />
            <Route path="/playground/:id" element={<Playground />} />
          </Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
