import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Button,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Container,
} from "@mui/material";
import { Favorite, FormatTextdirectionLToR } from "@mui/icons-material";
import EastIcon from "@mui/icons-material/East";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { supaClient } from "../../lib/supa-client";
import { useTrip } from "../../lib/trip-hooks";

export default function TripView() {
  const { session } = useContext(UserContext);
  const { id: tripId } = useParams();
  const { trip, loading } = useTrip(tripId);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formattedDate = dayjs(trip.trip_date).format("DD MMMM YYYY");
  const isAuthor = session?.user?.id === trip.author_id;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "600px", height: "100%", marginTop: 5 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="user" sx={{ bgcolor: "#525252" }}>
              P
            </Avatar>
          }
          title="Profile Name"
        ></CardHeader>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Container
            sx={{
              width: "100%",
              backgroundColor: "#525252",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              color: "white",
            }}
          >
            <Typography variant="h4">{trip.starting_city}</Typography>
            <EastIcon fontSize="large" />
            <Typography variant="h4">{trip.destination_city}</Typography>
          </Container>
          <Container
            sx={{
              marginTop: 4,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Container sx={{ display: "flex" }}>
              <CalendarMonthIcon fontSize="large" />
              <Typography fontSize="24px">{formattedDate}</Typography>
            </Container>
            <Container sx={{ display: "flex" }}>
              <AccessTimeIcon fontSize="large" />
              <Typography fontSize="24px">{trip.trip_time}</Typography>
            </Container>
          </Container>
          <Typography fontSize="20px" sx={{ marginTop: 4, marginBottom: 4 }}>
            {trip.info}
          </Typography>
        </CardContent>
        <CardActionArea sx={{ margin: 2 }}>
          {isAuthor && (
            <>
              <Button
                variant="contained"
                color="success"
                component={Link}
                to={`/trips/${trip.id}/edit`}
                sx={{ marginRight: 1 }}
              >
                Edit
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </>
          )}
        </CardActionArea>
      </Card>
    </Container>
  );
}
