export default function SignInForm({ onFormTypeChange }) {
  const handleChangeFormClick = () => {
    onFormTypeChange("sign-up");
  };

  return (
    <>
      <h1>Sign In form</h1>
      <button onClick={handleChangeFormClick}>Switch to Sign Up</button>
    </>
  );
}
