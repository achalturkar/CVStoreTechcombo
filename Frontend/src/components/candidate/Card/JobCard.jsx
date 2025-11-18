import React from "react";


const JobCard = ({ title, company, location, salary }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">
    <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{company}</p>
    <p className="text-sm text-gray-500">{location}</p>
    <p className="text-sm text-blue-600 font-medium mt-2">{salary}</p>
    <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
      Apply Now
    </button>
  </div>
);
export default JobCard;
