import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import logo from "../assets/logo.png"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          <h1 className="h4 mb-0">Quizzy</h1>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search"><i className="fas fa-search"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/notifications"><i className="fas fa-bell"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile"><i className="fas fa-user"></i></a>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-primary ms-3">Sign up</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
