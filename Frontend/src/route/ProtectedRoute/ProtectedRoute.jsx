import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("jwtToken");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/recruit/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      Cookies.remove("jwtToken");
      Cookies.remove("role");
      return <Navigate to="/recruit/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid or corrupted token:", error);
    Cookies.remove("jwtToken");
    Cookies.remove("role");
    return <Navigate to="/recruit/login" replace />;
  }
};

export default ProtectedRoute;
