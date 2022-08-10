import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({component: Component, ...rest }) {

// console.log(localStorage.getItem("jwt"));
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  return localStorage.getItem("jwt") ? <Component/> : <Navigate to="/" />;
}
