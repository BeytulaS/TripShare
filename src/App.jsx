import "./App.css";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ProfilePage from "./components/Profile";
import SignInPage from "./components/Authentication/SignIn";
import TripsBoard from "./components/TripsBoard";
import TripView from "./components/TripView";
import CreateTripPage from "./components/CreateTrip";
import EditTripPage from "./components/EditTrip";
import { createContext } from "react";
import { useSession } from "./lib/use-session";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/trips",
        element: <TripsBoard />,
      },
      {
        path: "/trips/:id",
        element: <TripView />,
      },
      {
        path: "/trips/create",
        element: <CreateTripPage />,
      },
      {
        path: "/trips/:id/edit",
        element: <EditTripPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

export const UserContext = createContext({
  session: null,
  profile: null,
});

function Layout() {
  const tripshareUserInfo = useSession();
  return (
    <>
      <UserContext.Provider value={tripshareUserInfo}>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </UserContext.Provider>
    </>
  );
}
