import React, { useEffect, useState,useContext} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import Widget from "../../components/widget/Widget";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.scss";



const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const token = localStorage.getItem("jwt");
    const temp = true;
    let userNum = 0;
    let activeUserNum = 0;
    let inactiveUserNum = 0;

    const countUser = (urs) => {
      userNum = urs.filter((item) => item.role === "user").length;
      activeUserNum = urs.filter((item) => item.role === "user" && item.status === "Active").length;
      inactiveUserNum = urs.filter((item) => item.role === "user" && item.status === "Inactive").length;
  };

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await axios.get(
            "http://localhost:5000/api/user/allUsers"
          );
          setData(result.data);
          countUser(result.data);
          console.log(userNum);
          console.log(activeUserNum);
          console.log(inactiveUserNum);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    React.deleteElement = (token) => {
      // console.log(data[0].token);
      // console.log(token);
      var url = "http://localhost:5000/api/user/deleteUser";
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Deleted");
            window.location.reload();
          } else {
            console.log("Error");
          }
        }
      };
      xhr.send(JSON.stringify({ token: token }));
    };
  
    React.logoutElement = (token) => {
      console.log(token);
      var url = "http://localhost:5000/api/user/logout";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Logged out");
            localStorage.removeItem("jwt");
            window.location.reload();
          } else {
            console.log("Error");
          }
        }
      };
      xhr.send(JSON.stringify({ token: token }));
    };

React.updateElement = (item,role) => {
        var url = "http://localhost:5000/api/user/updateuser";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + item.token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(data.length);
                    if (role === "admin") {
                      setData(data.filter((item) => item.role="admin"));
                      console.log("Updated");
                      window.location.reload();
                    } else if (role === "user") {
                      setData(data.filter((item) => (item.role = "user")));
                      console.log("Updated");
                      window.location.reload();
                    }
                } else {
                    console.log("Error");
                }
            }
        }
        xhr.send(JSON.stringify({ token: item.token, role: role }));
        };

    return (
     
      <div className="home">
        <Sidebar />
        <div className="container">
       
          <div className="row">
{/* All Admins Details Here*/}



          <div className="col-md-12">
          <div className="widgets">
          <Widget type="user" usr={data} />
          <Widget type="Active" usr={data}/>
          <Widget type="Inactive" usr={data} />

        </div>
            </div>
          </div>
        </div>
      </div>
    );
}


export default Dashboard;