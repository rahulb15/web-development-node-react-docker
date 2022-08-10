import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignupImage from '../../images/signup.png';
import handleValidate from "../../validating/Validate";


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    error: "",
    loading: false,
  });
  let name, value;

  //regular expression to check if email is valid
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  
  
  const handleChange = (e) => {
    name = e.target.name; // name of the input
    value = e.target.value; // value of the input
    if (name === "name" || name === "password_confirmation") {
      setUser({ ...user, [name]: value });
    } else {
    handleValidate(name, value, setUser, user);
    }
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();// prevent the default action of the form
    if (
      user.name &&
      user.email &&
      user.password &&

      user.password_confirmation
    ) {
      if (emailRegex.test(user.email)) {
        setUser({ ...user, loading: true });
        fetch("http://localhost:5000/api/user/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => 
            res.json()
            )
          .then((data) => {
            if (data.error) {
              setUser({ ...user, error: data.error, loading: false });
            } else {
              if(user.password === user.password_confirmation){
                if(passwordRegex.test(user.password)){
              navigate('/login')
                }
                else{
                  setUser({...user, passwordError: "Password must contain at least one number and one special character", loading: false})
                }
              }
              else{
                setUser({ ...user, error: "Password does not match", loading: false });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser({ ...user, error: "Invalid Email", loading: false });
      }
    } else {
      setUser({ ...user, error: "Please fill all the fields", loading: false });
    }
  };

  return (
    <div>
      <section className="signup">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="signup-content">
                <div className="signup-form">
                  <h1 className="form-title" align="center">
                    Signup
                  </h1>
                  <p className="form-description">
                    Please fill in this form to create your account.
                  </p>
                  <form
                    className="register-form"
                    id="register-form"
                    method="POST"
                  >
                    <div className="form-group">
                      <label className="control-label">Name</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

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
                      <label className="control-label">Confirm Password</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Confirm Password"
                          name="password_confirmation"
                          value={user.password_confirmation}
                          onChange={handleChange}
                          required
                        />

                      </div>
                      <p className="passwordError">{user.passwordError}</p>
                      <p className="signupError">{user.error}</p>


                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Signup
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="signup-image col-md-8" align="center">
              <figure>
                <img
                  src={SignupImage}
                  alt="singup image"
                  width="300"
                  height="300"
                />
              </figure>
              <NavLink className="signup-image-link" to="/login">
                I am already member
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
