import React, { useContext, useState } from "react";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();
  // Handle logout
  const handleLogout = () => {
    logoutUser();
    setLogoutMessage("Logout successful! Redirecting to sign-in..."); //   success message

    setTimeout(() => {
      setLogoutMessage("");
      navigate("/account/signin");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbarcttr">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Logo" className="me-1 img-fluid logoimg" />
            <h3 className="h5 mb-0">Quizzy</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/search">
                  <i className="fas fa-search"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/notifications">
                  <i className="fas fa-bell"></i>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end soft-dropdown"
                  aria-labelledby="userDropdown"
                >
                  {user ? (
                    <>
                      <li className="dropdown-item-text">
                        Logged in as: {user?.name}
                      </li>
                      <li className="dropdown-item-text">
                        Email: {user?.email}
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={handleLogout}
                          href="#"
                        >
                          Logout
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a className="dropdown-item" href="/account/signin">
                          Login
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/account/register">
                          Signup
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {logoutMessage && (
        <div className="alert alert-success text-center mt-3">
          {logoutMessage}
        </div>
      )}
    </>
  );
};

export default Navbar;
