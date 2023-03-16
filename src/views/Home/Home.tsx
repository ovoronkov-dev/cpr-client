import { Fragment } from "react";
import { GoogleAuthButton } from "~components/GoogleAuthButton";
import { useAuthState } from "~firebase/hooks/useAuthState";
import { HomeIntroContainer } from "./components/IntroContainer";

export const Home = () => {
  const [user, loading] = useAuthState();

  return <Fragment>{!user && !loading && <GoogleAuthButton />}</Fragment>;
};
