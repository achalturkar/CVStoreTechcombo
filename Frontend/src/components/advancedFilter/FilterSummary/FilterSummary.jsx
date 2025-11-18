import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FilterSummary = ({ filters, totalCandidates, search }) => {
  const navigate = useNavigate();
  const location = useLocation();

   const queryString = location.search;

  return (
    <div className="text-sm text-gray-700 mb-4 flex flex-col gap-2 px-2">
      <p className="text-gray-600 text-xs">
        Total Candidates Found:{" "}
        <span className="font-semibold text-blue-600">{totalCandidates}</span>
      </p>

      <div className="flex flex-wrap gap-2 items-center">

        {filters.keyword &&
          filters.keyword.split(" ").map((k, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {k}
            </span>
          ))}

        {filters.experience && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
            Experience: <b>{filters.experience}</b>
          </span>
        )}

        {filters.company.length > 0 && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
            Company: <b>{filters.company.join(", ")}</b>
          </span>
        )}

        {filters.location.length > 0 && (
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
            Location: <b>{filters.location.join(", ")}</b>
          </span>
        )}

        {/* Modify search */}
        <button
          onClick={() => navigate(`/search${queryString}`)}
          className="ml-auto text-blue-600 underline font-medium text-xs"
        >
          Modify Search
        </button>
      </div>
    </div>
  );
};

export default FilterSummary;
