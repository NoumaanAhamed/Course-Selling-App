import React from "react";
import SignIn from "./SignIn";

const UserLogin = ({ setIsLoggedIn }) => {
  return (
    <div>
      <SignIn role={"User"} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default UserLogin;
