import { Box, Container, Typography, Button, styled } from "@mui/material";
import { GoogleAuthButton } from "~components/GoogleAuthButton";

const PREFIX = "HomeIntroContainer";

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
};

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: "100vw",
    height: "100vh",

    backgroundColor: "#2e2e2e",
  },

  [`& .${classes.container}`]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    height: "100%",
  },
}));

export const HomeIntroContainer = () => {
  return (
    <Root className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Box>
          <Typography variant="h1">Coll Pick Rank</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolore amet possimus doloremque. Iste
            eveniet, autem magnam impedit cumque dolor ipsam unde incidunt est suscipit illo asperiores accusantium
            molestiae non!
          </Typography>
          <GoogleAuthButton />
        </Box>
      </Container>
    </Root>
  );
};
