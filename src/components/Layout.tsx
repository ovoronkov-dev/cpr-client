import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { Fragment, PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "~firebase/hooks/useAuthState";
import { playgroundAuth } from "~firebase/playground-config";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();

  const [user] = useAuthState();

  const handleLogout = () => {
    signOut(playgroundAuth);
    navigate("/");
  };

  return (
    <Box display="flex">
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CollPickRank
          </Typography>

          {user && (
            <Fragment>
              <Box>
                <Button color="inherit" variant="text" disableRipple>
                  Всі опитування
                </Button>
                <Button color="inherit" variant="text" disableRipple>
                  Пройдені опитування
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
                <Button color="inherit" variant="text" disableRipple onClick={handleLogout}>
                  Вийти
                </Button>
              </Box>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
