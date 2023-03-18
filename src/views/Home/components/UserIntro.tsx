import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { GoogleAuthButton } from "~components/GoogleAuthButton";

export const HomeUserIntro = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography sx={{ mb: 1 }}>Перейдіть за посиланням аби почати роботу із додатком.</Typography>

      <Button component={Link} to="/polls" color="primary" variant="contained">
        Почати роботу
      </Button>
    </Box>
  );
};
