import { Container, Typography } from "@mui/material";
import React from "react";
// import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import Album from "./AdminPanel";

const HomePage = ({ isLoggedIn }) => {
  return (
    <Container maxWidth="lg">
      {isLoggedIn ? (
        <div>
          <Album></Album>
        </div>
      ) : (
        <div>
          <Typography
            mt={10}
            fontWeight={"500"}
            textAlign={"center"}
            variant="h1"
          >
            Welcome to Sell-Course
          </Typography>
          <Typography m={5} textAlign={"center"} variant="h4">
            Your One Stop Place for Premium-Curated Courses
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
