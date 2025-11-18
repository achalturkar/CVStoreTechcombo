
import React from "react";

const StatsCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);
export default StatsCard;
