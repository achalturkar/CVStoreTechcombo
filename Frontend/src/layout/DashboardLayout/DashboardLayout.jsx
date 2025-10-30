// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../../components/layout/Navbar/Navbar";

// const DashboardLayout = () => {
//   return (
//     <div className="flex ">
//       {/* Sidebar/Navbar */}
//       <Navbar />

//       {/* Main content */}
//       <div className="flex-1  overflow-y-auto bg-gray-50 mt-16">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
// import HrNavbar from "../../components/layout/Navbar/HrNavbar";
// import AdminNavbar from "../../components/layout/Navbar/AdminNavbar";
// import SuperAdminNavbar from "../../components/layout/Navbar/SuperAdminNavbar";
import Navbar from "../../components/layout/Navbar/Navbar"
import AdminNavbar from "../../components/layout/Navbar/AdminNavbar/AdminNavbar";
import HrNavbar from "../../components/layout/Navbar/HrNavbar/HrNavbar";

const DashboardLayout = () => {
  const role = Cookies.get("role");

  const renderNavbar = () => {
    switch (role) {
      case "HR":
        return <HrNavbar />;
        break;
      case "ADMIN":
        return <Navbar />;
        break;
      case "SUPERADMIN":
        return <Navbar />;
      default:
        return null;
    }
  };

  return (
    <div className="flex ">
      {renderNavbar()}
      <main className="flex-1  overflow-y-auto bg-gray-50 mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

