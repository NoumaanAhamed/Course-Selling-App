const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json());

const USERS = [];
const ADMINS = [];
let COURSES = [];

const secretOrPrivateKey = "SECRET";

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Missing Auth Header" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretOrPrivateKey, (err, data) => {
    if (err) {
      return res.status(404).send({ message: "Unauthorized" });
    }
    req.data = data;
    next();
  });
}

function isAdmin(req, res, next) {
  if (!(req.data.role === "Admin")) {
    return res.status(404).send({ message: "Admins Only Allowed" });
  }
  next();
}

//! Admin Routes

//*Sign Up
app.post("/admin/signup", (req, res) => {
  //TODO: Get Username and Password from user
  const { username, password } = req.body;

  //? Ensure Username and Password is not empty in Frontend/Backend

  //? Check if Admin Already Exists

  //?Encrypt Password

  //TODO: Store the Data

  ADMINS.push({
    id: ADMINS.length + 1,
    username,
    password,
  });

  //TODO: Create a Token with the data
  const token = jwt.sign({ username, role: "Admin" }, secretOrPrivateKey, {
    expiresIn: "1h",
  });

  //TODO: Send the Token to Authenticate
  res.send({ message: "Admin created successfully", token });
});

//*Sign In
app.post("/admin/signin", (req, res) => {
  //TODO: Get Username and Password from user
  const { username, password } = req.body;

  //? Ensure Username and Password is not empty in Frontend/Backend

  //TODO: Check if Username and Password matches

  const reqAdmin = ADMINS.find((admin) => {
    return admin.username === username && admin.password === password;
  });

  if (!reqAdmin) {
    return res.status(401).send({ message: "Incorrect Username or Password" });
  }

  //TODO: Create a Token with the data
  const token = jwt.sign({ username, role: "Admin" }, secretOrPrivateKey, {
    expiresIn: "1h",
  });

  //TODO: Send the Token to Authenticate
  res.send({ message: "Admin Loggedin successfully", token });
});

//*View Courses
app.get("/admin/courses", isAuthenticated, isAdmin, (req, res) => {
  res.send({ Courses: COURSES });
});

//*Create Courses
app.post("/admin/courses", isAuthenticated, isAdmin, (req, res) => {
  //Todo: Get Course Details

  const { title, description, imageLink, price, published } = req.body;

  //? Course Details Shouldn't be Empty

  //? Course Shouldn't Already Exist

  //Todo: Store the Course Details

  COURSES.push({
    id: COURSES.length + 1,
    title,
    description,
    imageLink,
    price,
    published,
  });

  //Todo: Course Created Successfully

  res.send({ message: "Course Created Successfully" });
});

//*Delete Courses
app.delete("/admin/courses/:id", isAuthenticated, isAdmin, (req, res) => {
  const { id } = req.params;

  //? Check whether Course Exists

  //Todo: Delete the course

  const courseIndex = COURSES.findIndex((course) => {
    return course.id === parseInt(id);
  });

  COURSES.splice(courseIndex, 1);

  //Todo: Deleted Successfully

  res.send({ message: "Course Deleted Successfully" });
});

//*Update Courses
app.put("/admin/courses/:id", isAuthenticated, isAdmin, (req, res) => {
  const { id } = req.params;

  const { title, description, imageLink, price, published } = req.body;

  //? Course Details Shouldn't be Empty

  //? Course Shouldn't Already Exist

  //Todo: Update the details

  let reqCourseIndex = COURSES.findIndex((course) => {
    return course.id === parseInt(id);
  });

  COURSES[reqCourseIndex] = { ...COURSES[reqCourseIndex], ...req.body };

  //   console.log(reqCourse);
  console.log(COURSES);

  res.send({ message: "Course Updated Successfully" });
});

//*View a Course
app.get("/admin/courses/:id", isAuthenticated, isAdmin, (req, res) => {
  const { id } = req.params;

  //TODO: Get the Course

  const reqCourse = COURSES.find((course) => {
    return course.id === parseInt(id);
  });

  //TODO: Send the Course

  res.send({ currentCourse: reqCourse });
});

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
