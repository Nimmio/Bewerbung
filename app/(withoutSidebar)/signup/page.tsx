import React from "react";
import SignupForm from "./components/signup-form";
import SignupDisabled from "./components/signup-disabled";

const SignUpPage = () => {
  const signupEnabledEnvString = process.env.SIGNUP_ENABLED || "";
  const signupEnabled = ["true", "True", "TRUE"].includes(
    signupEnabledEnvString
  );
  return <>{signupEnabled ? <SignupForm /> : <SignupDisabled />}</>;
};

export default SignUpPage;
