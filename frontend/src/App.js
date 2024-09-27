import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./Pages/Hero";
import Register from "./Account/Register";
import { UserProvider } from "./Context/userContext";
import Signin from "./Account/Signin";

function App() {
  return (
    <React.StrictMode>
       <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
