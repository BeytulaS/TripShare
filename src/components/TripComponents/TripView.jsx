import { useContext, useState } from "react";
import { UserContext } from "../../App";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import ErrorDialog from "../ErrorDialog";
import ContactDialog from "./ContactDialog";
import { supaClient } from "../../lib/supa-client";
import { useTrip } from "../../lib/trip-hooks";

export default function TripView() {
  const { profile, session } = useContext(UserContext);
  const { id: tripId } = useParams();
  const { trip, loading } = useTrip(tripId);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  const datetimeStr = `${trip.trip_date}T${trip.trip_time}`;
  const formattedDate = dayjs(datetimeStr).format("DD MMMM YYYY");
  const formattedTime = dayjs(datetimeStr).format("HH:mm");
  const isAuthor = session?.user?.id === trip.author_id;

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };
  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
  };

  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  const handleDelete = async () => {
    try {
      const { error } = await supaClient
        .from("shared_trips")
        .delete()
        .eq("id", trip.id);

      navigate("/trips");
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorDialog(true);
    }
  };

  const handleRequest = async () => {};

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
            <Avatar aria-label="user" sx={{ bgcolor: "#525252" }}></Avatar>
          }
          title={profile?.username}
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
              <Typography fontSize="24px">{formattedTime}</Typography>
            </Container>
          </Container>
          <Typography fontSize="20px" sx={{ marginTop: 4, marginBottom: 4 }}>
            {trip.info}
          </Typography>
        </CardContent>
        <Container sx={{ margin: 2 }}>
          {isAuthor && (
            <Container>
              <Button
                variant="contained"
                color="success"
                component={Link}
                to={`/trips/${trip.id}/edit`}
                sx={{ marginRight: 1 }}
              >
                Редакция
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Изтриване
              </Button>
            </Container>
          )}
          {!isAuthor && session?.user && (
            <Container>
              <Button
                variant="contained"
                color="success"
                onClick={handleOpenContactDialog}
              >
                Заяви място
              </Button>
            </Container>
          )}
        </Container>
        <ErrorDialog
          open={openErrorDialog}
          onClose={handleCloseErrorDialog}
          message={errorMessage}
        />
        <ContactDialog
          open={openContactDialog}
          onClose={handleCloseContactDialog}
          tripId={tripId}
        />
      </Card>
    </Container>
  );
}
