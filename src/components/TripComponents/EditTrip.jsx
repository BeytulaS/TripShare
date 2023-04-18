import { useContext, useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useTrip } from "../../lib/trip-hooks";

export default function EditTripPage() {
  const { id: tripId } = useParams();
  const { trip, loading } = useTrip(tripId);
  const navigate = useNavigate();

  const { session } = useContext(UserContext);
  const [startingCity, setStartingCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [description, setDescription] = useState("");
  const [seatsValue, setSeatsValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (trip) {
      const datetimeStr = `${trip.trip_date}T${trip.trip_time}`;
      const formattedDate = dayjs(datetimeStr).format("MM/DD/YYYY");
      const formattedTime = dayjs(trip.trip_time, "HH:mm:ss").toDate();
      setStartingCity(trip.starting_city);
      setDestinationCity(trip.destination_city);
      setDateValue(dayjs(formattedDate));
      setTimeValue(formattedTime);
      setSeatsValue(trip.available_seats);
      setDescription(trip.info);
      console.log(trip);
    }
  }, [trip]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedTime = dayjs(timeValue).format("HH:mm");
    const { data, error } = await supaClient
      .from("shared_trips")
      .update([
        {
          id: trip.id,
          starting_city: startingCity,
          destination_city: destinationCity,
          trip_date: dateValue,
          trip_time: formattedTime,
          available_seats: parseInt(seatsValue),
          info: description,
        },
      ])
      .eq("id", trip.id);
    if (error) {
      setErrorMessage(error.message);
      setOpenErrorDialog(true);
    }
    navigate(`/trips/${trip.id}`);
  };

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
  const handleSeatsValueChange = (event) => {
    setSeatsValue(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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
                Редактирайте пътуването
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
                      label="Дата на пътуването"
                      minDate={minDate}
                      shouldDisableDate={shouldDisableDate}
                      value={dateValue}
                      inputFormat="dd/MM/yyyy"
                      onChange={(newValue) => setDateValue(newValue)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TimePicker
                      required
                      fullWidth
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
                      value={seatsValue}
                      onChange={handleSeatsValueChange}
                    />
                  </Grid>
                </Grid>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Описание"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Редакция
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
