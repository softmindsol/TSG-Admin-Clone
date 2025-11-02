import React from "react";
import { Navigate } from "react-router-dom";




const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // ✅ use same key as your login

//    if (!token || isTokenExpired(token)) {
//     localStorage.removeItem("adminToken");
//     return <Navigate to="/" replace />;
//   }

  return children;
};

export default ProtectedRoute;
