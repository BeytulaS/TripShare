import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supaClient } from "../../lib/supa-client";
import TripCard from "./TripCard";
import dayjs from "dayjs";

export default function TripsBoard() {
  const [trips, setTrips] = useState({ upcoming: [], expired: [] });

  useEffect(() => {
    const fetchTrips = async () => {
      const { data: tripsData, error } = await supaClient
        .from("shared_trips")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      const today = dayjs();
      const upcomingTrips = tripsData.filter(
        (trip) => dayjs(trip.trip_date) >= today
      );
      const expiredTrips = tripsData.filter(
        (trip) => dayjs(trip.trip_date) < today
      );

      setTrips({ upcoming: upcomingTrips, expired: expiredTrips });
    };
    fetchTrips();
  }, []);

  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button component={Link} to="/trips/create">
          Сподели пътуване
        </Button>
        <Typography component="h2" variant="h4">
          Предстоящи пътувания
        </Typography>
        {trips.upcoming.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
        <Typography component="h2" variant="h4">
          Минали пътувания
        </Typography>
      </Container>
    </>
  );
}
