import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Container } from "@mui/system";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { supaClient } from "../../lib/supa-client";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../ErrorDialog";
import { useContext, useState } from "react";
import { UserContext } from "../../App";

export default function CompleteProfilePage() {
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateValue, setDateValue] = useState(null);
  const { session } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  function calculateAge(dateString) {
    const birthday = dayjs(dateString);
    const now = dayjs();
    const age = now.diff(birthday, "year");
    return age;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formattedDate = dayjs(dateValue).format("YYYY-MM-DD");
    const name = data.get("username");
    const age = calculateAge(formattedDate);

    try {
      const { data, error } = await supaClient.from("user_profiles").insert([
        {
          user_id: session?.user.id,
          username: name,
          age: parseInt(age),
        },
      ]);

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorDialog(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="xs">
        <Container
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Завършете профила си
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
              id="username"
              label="Full name"
              name="username"
              autoComplete="username"
              sx={{ mt: 2 }}
            />
            <DatePicker
              required
              fullWidth
              id="date"
              name="date"
              label="Date of birth"
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Container>
        </Container>
        <ErrorDialog
          open={openErrorDialog}
          onClose={handleCloseErrorDialog}
          message={errorMessage}
        />
      </Container>
    </LocalizationProvider>
  );
}
