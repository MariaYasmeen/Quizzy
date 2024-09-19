import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Hero from './Pages/Hero';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>} /> 
           
        </Routes>
      </BrowserRouter>
      
    </React.StrictMode>
  );
}

export default App;