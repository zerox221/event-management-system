import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "user") {
    return <Navigate to="/user" replace />;
  }

  if (user.role === "organizer") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminProtectedRoute;