import { Box, Typography } from "@mui/material";
import { playgroundAuth } from "~firebase/playground-config";
import { HomeGuestIntro } from "./components/GuestIntro";
import { HomeUserIntro } from "./components/UserIntro";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const [user, loading] = useAuthState(playgroundAuth);

  return (
    <Box>
      <Typography variant="h1" align="center" sx={{ mb: 2 }}>
        CollPicRank
      </Typography>

      {!user && !loading && <HomeGuestIntro />}

      {user && <HomeUserIntro />}
    </Box>
  );
};
