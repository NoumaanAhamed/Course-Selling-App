import React from "react";

const HomePage = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <h1>Logged in</h1> : <h1> Not Logged In</h1>}</div>;
};

export default HomePage;
