import "bootstrap/dist/css/bootstrap.min.css";
import "./account.css";
import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { isLoading, signup } = useSignUp();

  function onSubmit(data) {
    signup(data);
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card soft-card p-4">
              <h2 className="text-center mb-4">Create an Account</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    {...register("name")}
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
                    name="email"
                    {...register("email")}
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
                    {...register("password")}
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
                    {...register("passwordConfirm")}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
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
