import "./App.css";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ProfilePage from "./components/Profile";
import SignInPage from "./components/Authentication/SignIn";
import ProfileCompletionForm from "./components/Authentication/ProfileCompletionForm";
import TripsBoard from "./components/TripComponents/TripsBoard";
import TripView from "./components/TripComponents/TripView";
import CreateTripPage from "./components/TripComponents/CreateTrip";
import EditTripPage from "./components/TripComponents/EditTrip";
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
      {
        path: "/complete-profile",
        element: <ProfileCompletionForm />,
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
