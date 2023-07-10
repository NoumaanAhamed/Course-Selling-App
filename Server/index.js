const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const USERS = [];
const ADMINS = [];
const COURSES = [];

//! Admin Routes

//*Sign Up

//*Sign In

//*View Courses

//*Create Courses

//*Delete Courses

//*Update Courses

//*View a Course

//! User Routes

//*Sign Up

//*Sign In

//*View Courses

//*Purchase Courses

//*View Purchased Courses

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Listening....");
});
