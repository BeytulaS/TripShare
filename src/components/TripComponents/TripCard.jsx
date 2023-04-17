import { Paper, Typography, Grid, Card, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trips/${trip.id}`);
  };

  return (
    <Paper
      variant="outlined"
      trip={trip}
      onClick={handleClick}
      sx={{
        height: "80px",
        width: "100%",
        color: "white",
        backgroundColor: "#525252",
        cursor: "pointer",
        pl: 4,
        pr: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">
        От {trip.starting_city} до {trip.destination_city}
      </Typography>
      <Typography variant="h5">На {trip.trip_date}</Typography>
      <Typography variant="h5">В {trip.trip_time}</Typography>
      <Typography variant="h5">Места 0/{trip.available_seats}</Typography>
    </Paper>
  );
}
