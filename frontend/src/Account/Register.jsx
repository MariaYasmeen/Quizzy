import React, { useState } from "react"; 
import Navbar from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./account.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit for sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Check if passwords match
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData);

      const response = await axios.post(
        "http://localhost:3300/api/v1/users/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        },
        { withCredentials: true }
      );

      console.log("Response from server:", response);

      if (response.data.status === "success") {
        setSuccess("Registration successful!");
        console.log("User registered successfully!");
        
        // Redirect to another page after successful registration
        setTimeout(() => {
          navigate("/login"); // Change the route as needed
        }, 2000);
      } else {
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);

      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      setError(message);
      console.log("Error message to display:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card soft-card p-4">
              <h2 className="text-center mb-4">Create an Account</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="passwordConfirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
