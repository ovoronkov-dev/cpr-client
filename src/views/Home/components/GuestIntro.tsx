import { Box, Typography } from "@mui/material";
import { GoogleAuthButton } from "~components/GoogleAuthButton";

export const HomeGuestIntro = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography align="center" sx={{ mb: 1 }}>
        Щоб продовжити роботу із додатком, будь ласка, увійдіть у систему за дпомогою Google авторизації.
      </Typography>

      <GoogleAuthButton />
    </Box>
  );
};
