import React from "react";
import SignUp from "./SignUp";

const AdminSignup = ({ setIsLoggedIn }) => {
  return (
    <div>
      <SignUp role={"Admin"} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default AdminSignup;
