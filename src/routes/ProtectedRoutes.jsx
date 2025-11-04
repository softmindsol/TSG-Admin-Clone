import React from "react";
import { Navigate } from "react-router-dom";
import PATH from "./path";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={PATH.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
