import React from "react";
import Logout from "../../auth/recruiter/Logout/Logout";
import Navbar from "../../../components/layout/Navbar/Navbar";



const SuperAdminDashboard = () => {
  return (
    <div className=" flex ">
      <div className="mt-20">
      <h1 className="text-2xl font-bold ">SuperAdmin Dashboard</h1>
      <p className="">Manage Admins, HRs, and overall system control.</p>

      {/* <Logout/> */}
      </div>
    </div>
  );
};
export default SuperAdminDashboard;
