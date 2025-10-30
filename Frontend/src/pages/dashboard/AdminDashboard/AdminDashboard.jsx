import React from "react";
import Logout from "../../auth/recruiter/Logout/Logout";


const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Post jobs, view candidates, and manage HR users.</p>
      <Logout/>
    </div>
  );
};
export default AdminDashboard;
