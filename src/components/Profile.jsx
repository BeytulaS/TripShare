import { useContext, useEffect, useState } from "react";
import { supaClient } from "../lib/supa-client";
import { UserContext } from "../App";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JoinRequest from "./JoinRequest";

export default function ProfilePage() {
  const [userTrips, setUserTrips] = useState([]);
  const [joinRequests, setJoinRequests] = useState({});
  const { session } = useContext(UserContext);

  useEffect(() => {
    async function fetchTripsAndJoinRequests() {
      //get user's trips
      if (session?.user.id) {
        const { data: userTrips, error: tripsError } = await supaClient
          .from("shared_trips")
          .select("*")
          .eq("author_id", session?.user.id);

        if (tripsError) {
          console.log(tripsError);
          return;
        }

        setUserTrips(userTrips);

        //get join requests for user's trips
        const tripIds = userTrips.map((trip) => trip.id);

        const { data: joinRequests, error: joinRequestsError } =
          await supaClient
            .from("join_requests")
            .select("*")
            .in("trip_id", tripIds);

        if (joinRequestsError) {
          console.log(joinRequestsError);
          return;
        }

        //group join_requests by trip_id
        const joinRequestsByTripId = {};
        joinRequests.forEach((request) => {
          if (!joinRequestsByTripId[request.trip_id]) {
            joinRequestsByTripId[request.trip_id] = [];
          }
          joinRequestsByTripId[request.trip_id].push(request);
        });

        setJoinRequests(joinRequestsByTripId);
      }
    }

    fetchTripsAndJoinRequests();
  }, []);

  const joinRequestsLength = Object.keys(joinRequests).reduce(
    (accumulator, currentKey) => accumulator + joinRequests[currentKey].length,
    0
  );

  async function deleteJoinRequest(joinRequestId) {
    const { error } = await supaClient
      .from("join_requests")
      .delete()
      .eq("id", joinRequestId);

    if (error) {
      console.log(error);
      return;
    }

    // remove the deleted join request from the state
    setJoinRequests((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((tripId) => {
        newState[tripId] = newState[tripId].filter(
          (joinRequest) => joinRequest.id !== joinRequestId
        );
      });
      return newState;
    });
  }

  if (userTrips.length === 0) {
    return <Typography>Нямате публикувани пътувания за показване</Typography>;
  } else {
    return (
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h4">
          Вашите публикувани пътувания
        </Typography>
        {userTrips.map((trip) => (
          <Accordion key={trip.id}>
            <AccordionSummary
              expandIcon={
                <Badge badgeContent={joinRequestsLength} color="primary">
                  <ExpandMoreIcon color="action" />
                </Badge>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Typography>
                  {trip.starting_city} - {trip.destination_city}
                </Typography>
                <Typography>Дата:{trip.trip_date}</Typography>
                <Typography>Час:{trip.trip_time}</Typography>
                <Typography>Налични места: 0/{trip.available_seats}</Typography>
              </Container>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Известия:</Typography>
              {joinRequests[trip.id] &&
                joinRequests[trip.id].map((request) => (
                  <JoinRequest
                    key={request.id}
                    joinRequest={request}
                    onDelete={deleteJoinRequest}
                  />
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    );
  }
}
