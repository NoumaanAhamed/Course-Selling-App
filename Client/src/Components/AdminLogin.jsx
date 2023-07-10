import React from "react";
import SignIn from "./SignIn";

const AdminLogin = ({ setIsLoggedIn }) => {
  return (
    <div>
      <SignIn role={"Admin"} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default AdminLogin;
