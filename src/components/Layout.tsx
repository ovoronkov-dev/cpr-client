import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Fragment, PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { playgroundAuth } from "~firebase/playground-config";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();

  const [user] = useAuthState(playgroundAuth);
  const [signOut] = useSignOut(playgroundAuth);

  const handleLogout = async () => {
    await signOut();
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
                <Button color="inherit" variant="text" disableRipple component={Link} to="/polls">
                  Всі опитування
                </Button>
                {/* <Button color="inherit" variant="text" disableRipple component={Link} to="/reports">
                  Пройдені опитування
                </Button> */}
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

      <Box
        component="main"
        sx={{
          p: 3,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
