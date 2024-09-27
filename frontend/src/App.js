import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./Pages/Hero";
import Register from "./Account/Register";
import RegisterV1 from "./Account/RegisterV1";
import Signin from "./Account/Signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/account/register2" element={<RegisterV1 />} />
            <Route path="/account/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
