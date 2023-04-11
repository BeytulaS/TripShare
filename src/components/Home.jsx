import { useContext } from "react";
import { UserContext } from "../App";

export default function HomePage() {
  const { session } = useContext(UserContext);
  return (
    <>
      <h1>Home Page</h1>
      <h2>{session?.user ? "user is logged in" : "user is logged out"}</h2>
    </>
  );
}
