import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar/Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
