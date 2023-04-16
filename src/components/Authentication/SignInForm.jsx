import { Container } from "@mui/system";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { supaClient } from "../../lib/supa-client";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../ErrorDialog";
import { useState } from "react";

export default function SignInForm({ onFormTypeChange }) {
  const navigate = useNavigate();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeFormClick = () => {
    onFormTypeChange("sign-up");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const { user, error } = await supaClient.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      } else {
        console.log(user);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorDialog(true);
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Вход
        </Typography>
        <Container
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            backgroundColor: "#fff",
            padding: 2,
            border: "1px solid black",
            borderRadius: 2,
            boxShadow: 5,
          }}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Имейл адрес"
            name="email"
            sx={{ mt: 2 }}
          />
          <TextField
            required
            fullWidth
            type="password"
            id="password"
            label="Парола"
            name="password"
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Вход
          </Button>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid item>
              <Typography>Нямате профил?</Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleChangeFormClick}>Регистрация</Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleCloseErrorDialog}
        message={errorMessage}
      />
    </Container>
  );
}
