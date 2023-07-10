import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import MenuAppBar from "./Components/MenuAppBar";
import AdminLogin from "./Components/AdminLogin";
import AdminSignup from "./Components/AdminSignup";
import UserLogin from "./Components/UserLogin";
import UserSignup from "./Components/UserSignup";

function App() {
  // const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <MenuAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />}></Route>
        <Route path="/admin/signup" element={<AdminSignup />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/users/signup" element={<UserSignup />}></Route>
        <Route path="/users/login" element={<UserLogin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
