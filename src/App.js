import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Women from "./pages/Women";
import Home from "./components/Home";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { auth } from "./FirebaseConfig"; // import your Firebase auth configuration

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
