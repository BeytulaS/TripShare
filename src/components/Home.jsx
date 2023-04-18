import { useContext } from "react";
import { UserContext } from "../App";
import { Container, CssBaseline, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { session } = useContext(UserContext);
  return (
    <CssBaseline>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h1">
          Начална страница
        </Typography>
        <Button sx={{ fontSize: "32px" }} component={Link} to="/trips">
          Намери пътуване
        </Button>
        <Typography>или</Typography>
        <Button sx={{ fontSize: "32px" }} component={Link} to="/trips/create">
          Публикувай пътуване
        </Button>
      </Container>
    </CssBaseline>
  );
}
