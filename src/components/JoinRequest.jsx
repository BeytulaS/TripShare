import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function JoinRequest({ joinRequest, onDelete, trip }) {
  const handleDelete = async () => {
    await onDelete(joinRequest.id);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore color="action" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>От {joinRequest.sender_name}</Typography>
          <Button onClick={handleDelete}>Изтрий</Button>
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <p>{joinRequest.request_message}</p>
        <p>Телефон за връзка: {joinRequest.phone_number}</p>
      </AccordionDetails>
    </Accordion>
  );
}
