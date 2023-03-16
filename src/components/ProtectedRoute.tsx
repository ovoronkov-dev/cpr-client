import { Alert, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "~firebase/hooks/useAuthState";

export const ProtectedRoute = () => {
  const [user, loading, error] = useAuthState();

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (!loading && !user) return <Navigate to="/" />;

  return <Outlet />;
};
