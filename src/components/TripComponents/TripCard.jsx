import { Height } from "@mui/icons-material";
import { Paper, Typography, Grid, Card, Container } from "@mui/material";

export default function TripCard({ trip }) {
  return (
    <Paper
      variant="outlined"
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
      <Typography>
        От {trip.starting_city} до {trip.destination_city}
      </Typography>
      <Typography>На {trip.trip_date}</Typography>
      <Typography>В {trip.trip_time}</Typography>
      <Typography>Места 0/{trip.available_seats}</Typography>
    </Paper>
  );
}
