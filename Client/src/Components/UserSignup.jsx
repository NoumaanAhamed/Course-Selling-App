import React from "react";
import SignUp from "./SignUp";

const UserSignup = ({ setIsLoggedIn }) => {
  return (
    <div>
      <SignUp role={"User"} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default UserSignup;
