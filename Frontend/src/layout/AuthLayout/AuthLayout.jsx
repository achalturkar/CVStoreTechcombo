

import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../../components/publicComponent/Navbar/PublicNavbar/PublicNavbar";

const AuthLayout = () => {
  return (
    <div className="">  
      <PublicNavbar />
      <div className="min-h-screen flex items-center justify-center ">
        <Outlet />
      </div>
    </div>

  );
};

export default AuthLayout;
