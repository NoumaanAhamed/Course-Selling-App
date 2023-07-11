import { Button, Container, Typography } from "@mui/material";
import React from "react";
// import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import UserAlbum from "./UserPanel";

const UserHomePage = ({ isLoggedIn }) => {
  return (
    <Container maxWidth="lg">
      {isLoggedIn ? (
        <div>
          <UserAlbum></UserAlbum>
        </div>
      ) : (
        <div>
          <Typography
            mt={10}
            fontWeight={"500"}
            textAlign={"center"}
            variant="h1"
          >
            Welcome to Sell-Course!
          </Typography>
          <Typography m={5} textAlign={"center"} variant="h4">
            Your One Stop Place for Premium-Curated Courses
          </Typography>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px", // Add margin top for space
            }}
          >
            <Button variant="contained" style={{ marginRight: "10px" }}>
              Start Learning
            </Button>
            <Button variant="outlined" style={{ marginLeft: "10px" }}>
              Start Teaching
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserHomePage;
