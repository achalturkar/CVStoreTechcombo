import React from "react";

const WebinarSection = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Join Webinar for Career Growth</h2>
      <img
        src="https://cdn.pixabay.com/photo/2016/11/29/05/08/audience-1866738_1280.jpg"
        alt="webinar"
        className="rounded-lg mb-3"
      />
      <p className="font-medium text-gray-700 mb-1">Top 5 GenAI Projects to Crack ₹30 LPA+ Roles</p>
      <p className="text-sm text-gray-500 mb-3">4 Nov, 8:30 PM • 177 Enrolled</p>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md">View Details</button>
    </div>
  );
};

export default WebinarSection;
