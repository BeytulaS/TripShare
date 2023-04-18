import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { supaClient } from "../../lib/supa-client";
import { UserContext } from "../../App";
import ErrorDialog from "../ErrorDialog";
import { useNavigate } from "react-router-dom";

export default function ContactDialog({ open, onClose, tripId }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { session } = useContext(UserContext);
  const navigate = useNavigate();

  const handleBlur = () => {
    setTouched(true);
  };
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const nameError = touched && name.trim() === "";
  const phoneError = touched && phoneNumber.trim() === "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const senderName = data.get("name");
    const phoneNumber = data.get("number");
    const message = data.get("message");

    try {
      const { data, error } = await supaClient.from("join_requests").insert([
        {
          sender_id: session?.user.id,
          sender_name: senderName,
          phone_number: phoneNumber,
          request_message: message,
          trip_id: tripId,
        },
      ]);
      if (error) {
        setErrorMessage(error.message);
        setOpenErrorDialog(true);
      }
      console.log(data);
      navigate(`/`);
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorDialog(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          //width: "600px",
        }}
      >
        <DialogTitle>Изпрати заявка</DialogTitle>
        <DialogContent>
          <Container
            component="form"
            id="contact-form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              marginTop: 1,
            }}
          >
            <TextField
              required
              label="Вашите имена"
              name="name"
              value={name}
              inputProps={{ maxLength: 30 }}
              onChange={(newValue) => setName(newValue.target.value)}
              onBlur={handleBlur}
              error={nameError}
              helperText={nameError ? "Полето е задължително" : ""}
            />
            <TextField
              required
              label="Телефон за контакт"
              name="number"
              value={phoneNumber}
              inputProps={{ maxLength: 20 }}
              onChange={(newValue) => setPhoneNumber(newValue.target.value)}
              onBlur={handleBlur}
              error={phoneError}
              helperText={phoneError ? "Полето е задължително" : ""}
            />
            <TextField
              multiline
              inputProps={{ maxLength: 250 }}
              maxRows={4}
              name="message"
              label="Съобщение"
              value={message}
              onChange={(newValue) => setMessage(newValue.target.value)}
            />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            form="contact-form"
          >
            Изпрати
          </Button>
          <Button onClick={onClose}>Отказ</Button>
        </DialogActions>
      </Container>
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleCloseErrorDialog}
        message={errorMessage}
      />
    </Dialog>
  );
}
