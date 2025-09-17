import React, { useState } from "react";

const Filter = ({ onResults }) => {
  const [filters, setFilters] = useState({
    fullName: "",
    phoneNumber: "",
    skills: "",
    address: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();

    for (let key in filters) {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/candidate/filter?${queryParams.toString()}`
      );
      const data = await response.json();
      onResults(data); 
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  return (
    <div className="p-4  rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filter Candidates</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="fullName"
          value={filters.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={filters.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="skills"
          value={filters.skills}
          onChange={handleChange}
          placeholder="Skills"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={filters.address}
          onChange={handleChange}
          placeholder="Address"
          className="p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default Filter;


