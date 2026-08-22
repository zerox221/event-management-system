import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ user, children }) => {
  if (user?.role === "user") {
    return <Navigate to="/user" replace />;
  }

  if (user?.role === "organizer") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoute;