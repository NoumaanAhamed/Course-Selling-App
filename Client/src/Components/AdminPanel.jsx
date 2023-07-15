import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, AlertTitle, Snackbar, TextField } from "@mui/material";
import FormDialog from "./DeletePopup";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
    title: "",
    description: "",
    imageLink: "",
    price: 0,
  });
  const [addCard, setAddCard] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStatusMessage("");
  };

  const fetchCourses = () => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(cards);
        setCards(data.Courses);
      });
  };

  React.useEffect(() => {
    fetchCourses();

    const interval = setInterval(fetchCourses, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  function viewCourse(id) {
    console.log(id);
  }

  function editCourse(card) {
    setSelectedCard(card);
    setEditFormData({
      title: card.title,
      description: card.description,
      imageLink: card.imageLink,
      price: parseInt(card.price),
    });
  }

  function handleFormChange(e) {
    setEditFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleFormSubmit() {
    fetch(`http://localhost:3000/admin/courses/${selectedCard._id}`, {
      method: "PUT",
      headers: {
        "COntent-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...editFormData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatusMessage(`${data.message}`);
        setSelectedCard(null);
        setEditFormData({
          title: "",
          description: "",
          imageLink: "",
          price: 0,
        });
      });
  }

  function closeUpdate() {
    setSelectedCard(null);
    setEditFormData({
      title: "",
      description: "",
      imageLink: "",
      price: 0,
    });
  }

  function handleAddCourse() {
    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...editFormData }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.message);
        setAddCard(false);
        setStatusMessage("Course Created Successfully");
        // setTimeout(() => {
        //   setStatusMessage(false);
        // }, 3000);
      });
  }

  function deleteCourse(id) {
    // console.log(id);
    fetch(`http://localhost:3000/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatusMessage("Course Deleted Successfully");
        // console.log(data.message);
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {statusMessage && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {statusMessage}
            </Alert>
          </Snackbar>
        )}
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              DashBoard
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Manage all the Courses Here.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                onClick={() => {
                  setAddCard(true);
                }}
                variant="contained"
              >
                Add a New Course
              </Button>
            </Stack>
            {addCard && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 2rem 2rem 2rem",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  name="title"
                  placeholder="title"
                  onChange={handleFormChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  name="description"
                  placeholder="description"
                  onChange={handleFormChange}
                />

                <TextField
                  id="outlined-basic"
                  label="ImageLink"
                  variant="outlined"
                  name="imageLink"
                  placeholder="image"
                  onChange={handleFormChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  name="price"
                  placeholder="price"
                  onChange={handleFormChange}
                />
                <Button
                  onClick={() => {
                    setAddCard(false);
                  }}
                  variant="contained"
                  color="error"
                >
                  Close
                </Button>
                <Button onClick={handleAddCourse} variant="contained">
                  Add
                </Button>
              </div>
            )}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {selectedCard && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 4rem 4rem 4rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={editFormData.title}
                name="title"
                placeholder="title"
                onChange={handleFormChange}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={editFormData.description}
                name="description"
                placeholder="description"
                onChange={handleFormChange}
              />

              <TextField
                id="outlined-basic"
                label="ImageLink"
                variant="outlined"
                value={editFormData.imageLink}
                name="imageLink"
                placeholder="image"
                onChange={handleFormChange}
              />
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                value={editFormData.price}
                name="price"
                placeholder="price"
                onChange={handleFormChange}
              />
              <Button onClick={closeUpdate} variant="contained" color="error">
                Close
              </Button>
              <Button onClick={handleFormSubmit} variant="contained">
                Update
              </Button>
            </div>
          )}
          <Grid container spacing={4}>
            {/* {console.log(cards)} */}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={card.imageLink}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                    <Typography textAlign={"right"}>₹{card.price}</Typography>
                    <Typography variant="caption">
                      Created by {card.createdBy.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => viewCourse(card._id)} size="small">
                      View
                    </Button>
                    <Button onClick={() => editCourse(card)} size="small">
                      Edit
                    </Button>
                    {/* <FormDialog /> */}
                    <Button
                      onClick={() => deleteCourse(card._id)}
                      size="small"
                      color="error"
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer
      {/* End footer */}
    </ThemeProvider>
  );
}
