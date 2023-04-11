import { useContext, useState } from "react";
import { UserContext } from "../../App";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function SignInPage() {
  const { session } = useContext(UserContext);
  const [formType, setFormType] = useState("sign-in");

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  return (
    <>
      {session?.user ? (
        <div>User already signed in</div>
      ) : formType === "sign-in" ? (
        <SignInForm onFormTypeChange={handleFormTypeChange} />
      ) : (
        <SignUpForm onFormTypeChange={handleFormTypeChange} />
      )}
    </>
  );
}
