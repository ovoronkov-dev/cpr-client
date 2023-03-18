import { Alert, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { playgroundAuth } from "~firebase/playground-config";

export const ProtectedRoute = () => {
  const [user, loading, error] = useAuthState(playgroundAuth);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (!loading && !user) return <Navigate to="/" />;

  return <Outlet />;
};
