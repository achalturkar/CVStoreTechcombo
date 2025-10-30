import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const jobSuggestions = [
  "Java Developer",
  "Java Full Stack Developer",
  "React Developer",
  "Frontend Engineer",
  "Backend Developer",
  "Spring Boot Developer",
  "UI/UX Designer",
  "SQL Developer",
];

const PublicHeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = jobSuggestions.filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-green-100 to-green-200 text-white min-h-[90vh] px-4 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>

      <div className="relative z-10 max-w-3xl mt-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Find Your <span className="text-blue-700">Dream Job</span> Today
        </h1>
        <p className="text-lg md:text-xl text-black mb-8">
          Explore top opportunities that match your skills and passion.
        </p>

        {/* Search Bar */}
        <div className="relative bg-white rounded-full shadow-lg flex items-center justify-between w-full max-w-2xl mx-auto overflow-hidden">
          <input
            type="text"
            placeholder="Search by skills, job title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow px-6 py-3 text-gray-800 text-base focus:outline-none"
          />
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 font-semibold hover:scale-105 transition-all duration-300">
            <FaSearch className="inline mr-2" /> Search Jobs
          </button>
        </div>

        {/* Autocomplete Suggestions */}
        {filteredSuggestions.length > 0 && (
          <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-700 rounded-lg shadow-lg w-full max-w-2xl z-20">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-5 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        {/* Candidate Tagline */}
        <p className="mt-12 text-sm md:text-base text-black italic">
          💡 “Your career starts here — connect, apply, and grow with confidence.”
        </p>
      </div>
    </section>
  );
};

export default PublicHeroSection;
