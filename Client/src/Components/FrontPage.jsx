import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
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
        <div
          style={{
            textAlign: "center",
            marginTop: "10px", // Add margin top for space
          }}
        >
          <Button
            onClick={() => {
              navigate("/users/login");
            }}
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Start Learning
          </Button>
          <Button
            onClick={() => {
              navigate("/admin/login");
            }}
            variant="outlined"
            style={{ marginLeft: "10px" }}
          >
            Start Teaching
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default FrontPage;
