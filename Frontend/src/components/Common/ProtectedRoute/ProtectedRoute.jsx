import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const token = Cookies.get("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? <Component /> : null;
};

export default ProtectedRoute;
