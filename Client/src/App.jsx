import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import MenuAppBar from "./Components/MenuAppBar";
import AdminLogin from "./Components/AdminLogin";
import AdminSignup from "./Components/AdminSignup";
import UserLogin from "./Components/UserLogin";
import UserSignup from "./Components/UserSignup";
import StickyFooter from "./Components/StickyFooter";
import UserHomePage from "./Components/UserHomePage";
import FrontPage from "./Components/FrontPage";

function App() {
  // const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    function checkLoginStatus() {
      fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status == 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }

    if (token) {
      checkLoginStatus();
    }
  }, []);

  return (
    <Router>
      <MenuAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route
          path="/admin"
          element={<HomePage isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route
          path="/users"
          element={<UserHomePage isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route
          path="/admin/signup"
          element={<AdminSignup setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/admin/login"
          element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/users/signup"
          element={<UserSignup setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/users/login"
          element={<UserLogin setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
      </Routes>
      <StickyFooter />
    </Router>
  );
}

export default App;
