import { Button, styled } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { playgroundAuth } from "~firebase/playground-config";

const StyledButton = styled(Button)({});

const authProvider = new GoogleAuthProvider();

export const GoogleAuthButton = () => {
  const handleClick = async () => {
    try {
      await signInWithPopup(playgroundAuth, authProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledButton startIcon={<GoogleIcon />} variant="contained" color="primary" onClick={handleClick}>
      Увійти з Google
    </StyledButton>
  );
};
