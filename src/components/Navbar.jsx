import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { supaClient } from "../lib/supa-client";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await supaClient.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CssBaseline>
      <AppBar position="static" sx={{ margin: 0 }}>
        <Toolbar sx={{ padding: 0 }}>
          <Button
            color="inherit"
            edge="start"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <SwapCallsIcon />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              TripShare
            </Typography>
          </Button>

          {session?.user ? (
            <>
              <Button color="inherit" component={Link} to="/trips">
                Trips
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/trips">
                Trips
              </Button>
              <Button color="inherit" component={Link} to="/signin">
                Sign In
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
