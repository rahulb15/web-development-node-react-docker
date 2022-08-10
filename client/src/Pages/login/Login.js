import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginImg from '../../images/4.jpg';
import handleValidate from "../../validating/Validate";
import { UserContext } from "../../App";







const Login = () => {
  const [ state, dispatch ] = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  let name, value;
  //regular expression to check if email is valid
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    handleValidate(name, value, setUser, user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user);
    if (user.email || user.password) {
      if (emailRegex.test(user.email)) {
        setUser({ ...user, loading: true });
        fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setUser({ ...user, error: data.error, loading: false });
            } else {
              // if (data.status === "Success") {
                if (data.token) {
                  console.log("Login Page");
                  console.log(data);
                  if (data.role === "admin") {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("role", data.role);
                    dispatch({ type: "USER", payload: localStorage.getItem("jwt") });
                    navigate("/Admin");
                  }
                  else if (data.role === "user") {
                  localStorage.setItem("jwt", data.token);
                  localStorage.setItem("role", data.role);
                  dispatch({ type: "USER", payload: localStorage.getItem("jwt") });
                  navigate("/welcome");
                }
                  console.log(data.role);
              } else {
                setUser({
                  ...user,
                  error: "Invalid Credentials",
                  loading: false,
                });
                console.log("Invalid Credentials");

                if (user.password === "") {
                  console.log("Password is empty");
                  setUser({
                    ...user,
                    passwordError: "Password is required",
                    loading: false,
                  });
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser({
          ...user,
          emailError: "Invalid Email or Maybe Empty",
          loading: false,
        });
      }
    } else {
      setUser({ ...user, error: "Please fill all the fields", loading: false });
    }
  };

  return (
    <div>
      <section className="login">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="login-content">
                <div className="login-form">
                  <h1 className="form-title">Login</h1>
                  <p className="form-description">
                    Please fill in this form to login.
                  </p>

                  <form className="login-form" id="login-form" method="POST">
                    <div className="form-group">
                      <label className="control-label">Email</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p className="emailError">{user.emailError}</p>
                      <label className="control-label">Password</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p className="passwordError">{user.passwordError}</p>
                      <p className="loginError">{user.error}</p>
                      <button className="btn btn-primary btn-lg btn-block"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="login-image col-md-8" align="center">
              <figure>
                <img
                  src={LoginImg}
                  alt="singup"
                  width="300"
                  height="300"
                />
              </figure>
              <NavLink className="signup-image-link" to="/signup">
                Don't Have Account
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
