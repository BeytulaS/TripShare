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
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSignIn() {
    setIsLoggedIn(true);
  }

  function handleSignOut() {
    setIsLoggedIn(false);
  }

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

          {isLoggedIn ? (
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
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
