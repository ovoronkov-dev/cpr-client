import { Button, styled } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { playgroundAuth } from "~firebase/playground-config";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const StyledButton = styled(Button)({});

export const GoogleAuthButton = () => {
  const [signInWithGoogle] = useSignInWithGoogle(playgroundAuth);

  const handleClick = async () => signInWithGoogle();

  return (
    <StyledButton startIcon={<GoogleIcon />} variant="contained" color="primary" onClick={handleClick}>
      Увійти з Google
    </StyledButton>
  );
};
