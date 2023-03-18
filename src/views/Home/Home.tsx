import { Box, Typography } from "@mui/material";
import { useAuthState } from "~firebase/hooks/useAuthState";
import { HomeGuestIntro } from "./components/GuestIntro";
import { HomeUserIntro } from "./components/UserIntro";

export const Home = () => {
  const [user, loading] = useAuthState();

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
