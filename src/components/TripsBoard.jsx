import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function TripsBoard() {
  return (
    <>
      <h1>Trips Board</h1>
      <Button component={Link} to="/trips/create">
        Добавете пътуване
      </Button>
    </>
  );
}
