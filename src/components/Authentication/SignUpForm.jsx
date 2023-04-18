import { Container } from "@mui/system";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { supaClient } from "../../lib/supa-client";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../ErrorDialog";
import { useState } from "react";

export default function SignUpForm({ onFormTypeChange }) {
  const navigate = useNavigate();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeFormClick = () => {
    onFormTypeChange("sign-in");
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const { user, error } = await supaClient.auth.signUp({
        email: email,
        password: password,
      });

      navigate("/complete-profile");
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorDialog(true);
    }
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
          Регистрация
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
            autoComplete="email"
            autoFocus
            sx={{ mt: 2.5 }}
          />
          <TextField
            required
            fullWidth
            type="password"
            id="password"
            label="Парола"
            name="password"
            autoComplete="current-password"
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Регистрация
          </Button>
          <Grid
            container
            sx={{
              direction: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Typography>Вече имате профил?</Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleChangeFormClick}>Вход</Button>
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
