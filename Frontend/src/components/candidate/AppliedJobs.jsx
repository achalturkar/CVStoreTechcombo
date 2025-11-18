import React from "react";

const AppliedJobs = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-3">Applied to "Java Developer"</h2>
      <div className="flex justify-between items-center border-t pt-3">
        <p className="text-gray-600">Next step: Start interview preparation</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Start Preparing
        </button>
      </div>
    </div>
  );
};

export default AppliedJobs;
