export default function SignUpForm({ onFormTypeChange }) {
  const handleChangeFormClick = () => {
    onFormTypeChange("sign-in");
  };

  return (
    <>
      <h1>Sign Up form</h1>
      <button onClick={handleChangeFormClick}>Switch to Sign In</button>
    </>
  );
}
