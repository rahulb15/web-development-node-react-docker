import "./navbar.scss";
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate} from "react-router-dom";
import logo from "../../images/1.png";
import { UserContext } from "../../App";
import axios from "axios";

const Navbar = () => {
  const [state, dispatch] = useContext(UserContext);
  const temp = localStorage.getItem("jwt");
  const navigate = useNavigate();
  
  const RenderMenu = () => {
    
    
    async function logout(e) {
      e.preventDefault();
      const result = await axios.get(
        "http://localhost:5000/api/user/logout",
        { headers: { Authorization: "Bearer " + temp } }
      );
      localStorage.removeItem("jwt");
      dispatch({ type: "USER", payload: null });
      window.location.reload();
      navigate("/");
    }   



    if (temp) {
      return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/setting">
               Setting
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout" onClick={logout}>
              {/* <NavLink className="nav-link" to="/logout"> */}
                Logout
              </NavLink>

            </li>
            <li className="nav-item">
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <div class="form-outline">
                  <input type="search" id="form1" class="form-control" placeholder="Search Tarsier" aria-label="Search" />
              </div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <NavLink className="navbar-brand" to="/">
        <img
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt=""
        />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <RenderMenu />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
