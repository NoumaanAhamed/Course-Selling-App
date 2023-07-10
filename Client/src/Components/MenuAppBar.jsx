import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar({ isLoggedIn, setIsLoggedIn }) {
  // const [auth, setAuth] = React.useState(true);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleLogOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <BookIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sell-Courses
          </Typography>
          {/* {auth ? ( */}
          {isLoggedIn ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => navigate("/admin/signup")}
                variant="contained"
                style={{ margin: 10 }}
              >
                SIGN UP
              </Button>
              <Button
                onClick={() => navigate("/admin/login")}
                variant="contained"
              >
                SIGN IN
              </Button>
            </div>
          )}

          {/* ) :  */}
          {/* (
            <div>
              <Button variant="contained" style={{ margin: 10 }}>
                SIGN UP
              </Button>
              <Button variant="contained">SIGN IN</Button>
            </div>
          ) */}
          {/* } */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
