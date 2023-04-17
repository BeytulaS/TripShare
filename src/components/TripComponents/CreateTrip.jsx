import { useContext, useState } from "react";
import { UserContext } from "../../App";
import {
  Container,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { supaClient } from "../../lib/supa-client";
import ErrorDialog from "../ErrorDialog";
import { useNavigate } from "react-router-dom";

export default function CreateTripPage() {
  const { session } = useContext(UserContext);
  const [startingCity, setStartingCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const minDate = dayjs();
  const shouldDisableDate = (date) => {
    return dayjs(date).isBefore(minDate, "day");
  };

  const handleStartingCityChange = (event) => {
    setStartingCity(event.target.value);
  };
  const handleDestinationCityChange = (event) => {
    setDestinationCity(event.target.value);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const cities = [
    "Благоевград",
    "Бургас",
    "Варна",
    "Велико Търново",
    "Видин",
    "Враца",
    "Габрово",
    "Добрич",
    "Кърджали",
    "Кюстендил",
    "Ловеч",
    "Монтана",
    "Пазарджик",
    "Перник",
    "Плевен",
    "Пловдив",
    "Разград",
    "Русе",
    "Силистра",
    "Сливен",
    "Смолян",
    "София",
    "Стара Загора",
    "Търговище",
    "Хасково",
    "Шумен",
    "Ямбол",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formattedDate = dayjs(dateValue).format("YYYY-MM-DD");
    const formattedTime = dayjs(timeValue).format("HH:mm");
    const start = data.get("start");
    const destination = data.get("destination");
    const seats = data.get("seats");
    const description = data.get("description");

    console.log(session?.user.id);

    const { data: tripData, error: tripError } = await supaClient
      .from("shared_trips")
      .insert([
        {
          author_id: session?.user.id,
          starting_city: start,
          destination_city: destination,
          trip_date: formattedDate,
          trip_time: formattedTime,
          available_seats: parseInt(seats),
          info: description,
        },
      ])
      .select("*");
    console.log(tripData, tripError);
    if (tripError) {
      setErrorMessage(tripError.message);
      setOpenErrorDialog(true);
    }
    navigate("/trips");
  };

  return (
    <>
      {session?.user ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container component="main" maxWidth="s">
            <Container
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4">
                Добавяне на пътуване
              </Typography>
              <Container
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  width: "600px",
                  backgroundColor: "#fff",
                  padding: 4,
                  border: "1px solid black",
                  borderRadius: 2,
                  boxShadow: 5,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel>От:</InputLabel>
                    <Select
                      fullWidth
                      value={startingCity}
                      onChange={handleStartingCityChange}
                      id="start"
                      name="start"
                    >
                      {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>До:</InputLabel>
                    <Select
                      fullWidth
                      value={destinationCity}
                      onChange={handleDestinationCityChange}
                      id="destination"
                      name="destination"
                    >
                      {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={5}>
                    <DatePicker
                      required
                      fullWidth
                      id="date"
                      name="date"
                      label="Дата на пътуването"
                      minDate={minDate}
                      shouldDisableDate={shouldDisableDate}
                      value={dateValue}
                      onChange={(newValue) => setDateValue(newValue)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TimePicker
                      required
                      fullWidth
                      id="date"
                      name="date"
                      label="Час на пътуването"
                      value={timeValue}
                      onChange={(newValue) => setTimeValue(newValue)}
                      ampm={false}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      id="seats"
                      label="Места"
                      name="seats"
                      defaultValue={2}
                    />
                  </Grid>
                </Grid>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Описание"
                  name="description"
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Публикувай
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
      ) : (
        <>
          <h1>User logged out</h1>
        </>
      )}
    </>
  );
}
