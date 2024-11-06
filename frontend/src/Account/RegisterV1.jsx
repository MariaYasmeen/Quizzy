import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./account.css";
import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { isLoading, signup } = useSignUp();
  const { saveUser } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = await signup(data);
      saveUser(userData); // Save user data to context
      setSuccessMessage("Registration successful! Redirecting to sign-in...");
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/account/signin");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      {showSuccess && (
        <div
          className="alert alert-success text-center fixed-top"
          style={{ zIndex: 1000 }}
        >
          {successMessage}
        </div>
      )}

      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card soft-card p-4">
              <h2 className="text-center mb-4">Create an Account</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <input
                    placeholder="Name"
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Password"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      validate: {
                        hasUppercase: (value) =>
                          /[A-Z]/.test(value) || "Password must include at least one uppercase letter",
                        hasLowercase: (value) =>
                          /[a-z]/.test(value) || "Password must include at least one lowercase letter",
                        hasDigit: (value) =>
                          /[0-9]/.test(value) || "Password must include at least one digit",
                        hasSpecialChar: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          "Password must include at least one special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    className={`form-control ${
                      errors.passwordConfirm ? "is-invalid" : ""
                    }`}
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.passwordConfirm && (
                    <div className="invalid-feedback">
                      {errors.passwordConfirm.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
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
