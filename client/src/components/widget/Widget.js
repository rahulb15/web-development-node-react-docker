import { NavLink } from "react-router-dom";
import "./widget.scss";
import React from "react";

let userNum = 0;
let activeUserNum = 0;
let inactiveUserNum = 0;

const Widget = ({ type,usr}) => {
  let item;
  
usr.map((items) => {
    console.log(usr.length);
        userNum = usr.filter((item) => item.role === "user").length;
        activeUserNum = usr.filter((item) => item.role === "user" && item.status === "Active").length;
        inactiveUserNum = usr.filter((item) => item.role === "user" && item.status === "Inactive").length;
}
    );

    switch (type) {
            case "user":
              item = {
                title: "USERS",
                count: userNum,
                link: <NavLink to="/list">See all Users</NavLink>,
              };
              break;
            case "Active":
              item = {
                title: "ACTIVE USERS",
                count: activeUserNum,
                link: <NavLink to="/list">See all Active Users</NavLink>,
              };
              break;
            case "Inactive":
              item = {
                title: "INACTIVE USERS",
                count: inactiveUserNum,
                link: <NavLink to="/list">See all Inactive Users</NavLink>,
              };
              break;
            default:
              break;
          }
    


  return (
    
    <div className="widget">
    <div className="left">
        <span className="title">{item.title}</span>
        <span className="counter">
          {item.count}
        </span>
        <span className="link">{item.link}</span>
      </div>
    </div>
  );
};

export default Widget;
