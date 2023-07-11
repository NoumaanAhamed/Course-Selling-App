const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  username: String,
  password: String,
});

const userSchema = new Schema({
  username: String,
  password: String,
  purchasedCourses : //
});

const courseSchema = new Schema({
  title:String,
  description:String,
  price:Number,
  imageLink:String,
  published:Boolean
})

const User = mongoose.model('Users',userSchema);
const Admin = mongoose.model('Admins',adminSchema);
const Course = mongoose.model('Courses',courseSchema);

mongoose
  .connect(
    "mongodb+srv://noumaanahamed:wasdijkl14145@course-selling-app.hpfwzko.mongodb.net/",
    {
      dbName: "Sell-Courses",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database Connected");
  });


const app = express();

app.use(cors());
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

  console.log(ADMINS);

  //TODO: Send the Token to Authenticate
  res.send({ message: "Admin created successfully", token });
});

//*Sign In
app.post("/admin/login", (req, res) => {
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
app.post("/users/signup", (req, res) => {
  //TODO: Get Username and Password from user
  const { username, password } = req.body;

  //? Ensure Username and Password is not empty in Frontend/Backend

  //? Check if User Already Exists

  //?Encrypt Password

  //TODO: Store the Data

  USERS.push({
    id: USERS.length + 1,
    username,
    password,
    purchasedCourses: [],
  });

  //TODO: Create a Token with the data
  const token = jwt.sign({ username, role: "User" }, secretOrPrivateKey, {
    expiresIn: "1h",
  });

  console.log(USERS);

  //TODO: Send the Token to Authenticate
  res.send({ message: "User created successfully", token });
});

//*Sign In
app.post("/users/login", (req, res) => {
  //TODO: Get Username and Password from user
  const { username, password } = req.body;

  //? Ensure Username and Password is not empty in Frontend/Backend

  //TODO: Check if Username and Password matches

  const reqUser = USERS.find((user) => {
    return user.username === username && user.password === password;
  });

  if (!reqUser) {
    return res.status(401).send({ message: "Incorrect Username or Password" });
  }

  //TODO: Create a Token with the data
  const token = jwt.sign({ username, role: "User" }, secretOrPrivateKey, {
    expiresIn: "1h",
  });

  //TODO: Send the Token to Authenticate
  res.send({ message: "User LoggedIn successfully", token });
});

//*View Courses
app.get("/users/courses", isAuthenticated, (req, res) => {
  res.send({ Courses: COURSES });
});

//*View a Course
app.get("/users/courses/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;

  //TODO: Get the Course

  const reqCourse = COURSES.find((course) => {
    return course.id === parseInt(id);
  });

  //TODO: Send the Course

  res.send({ currentCourse: reqCourse });
});

//*Purchase Courses
app.post("/users/courses/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;

  const { username } = req.data;

  //?Find User Index and Whether User exists

  const reqUserIndex = USERS.findIndex((user) => {
    return user.username === username;
  });

  //?Find Course and Whether Course exists

  const reqCourse = COURSES.find((course) => {
    return course.id === parseInt(id);
  });

  USERS[reqUserIndex].purchasedCourses.push(reqCourse);

  console.log(USERS);

  res.send({ message: "Course Purchased Successfully" });
});

//*View Purchased Courses
app.get("/users/purchasedCourses", isAuthenticated, (req, res) => {
  //?Find User Index and Whether User exists

  const { username } = req.data;

  const reqUser = USERS.find((user) => {
    return user.username === username;
  });

  res.send({ purchasedCourses: reqUser.purchasedCourses });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/profile", isAuthenticated, (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Listening....");
});
