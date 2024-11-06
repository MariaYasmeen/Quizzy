import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setLogoutMessage("Logout successful! Redirecting to sign-in...");

    setTimeout(() => {
      setLogoutMessage("");
      navigate("/account/signin");
    }, 1000);
  };

  // Function to get user's initials
  const getUserInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0).toUpperCase()).join("");
  };

  // Effect to check user state changes
  useEffect(() => {
    if (user) {
      setLogoutMessage("");
    }
  }, [user]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbarcss sticky-top">
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
                <Link className="nav-link" to="/dashboard/home">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <input className="form-control w-100" placeholder="Search..." aria-label="Search" />
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/search">
                  <i className="bi bi-search"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/notifications">
                  <i className="bi bi-bell"></i>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user ? (
                    <div className="user-initials-circle">
                      {getUserInitials(user.name)}
                    </div>
                  ) : (
                    <i className="bi bi-person-circle"></i>
                  )}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end soft-dropdown"
                  aria-labelledby="userDropdown"
                >
                  {user ? (
                    <>
                      <li>
                        <span className="dropdown-item-text">
                          Logged in as: {user.name}
                        </span>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/account/settings">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleLogout} href="#">
                          Logout
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/account/signin">
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/account/register2">
                          Sign Up
                        </Link>
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
