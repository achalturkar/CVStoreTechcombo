import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ keyword, setKeyword, onSearch }) => {
  return (
    <div className="border bg-white shadow-sm p-4 flex items-center gap-3">
      <FaSearch className="text-gray-600 text-lg" />

      <input
        type="text"
        placeholder="Search by skill, job title, technology (e.g. Java, React)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full text-[15px] outline-none tracking-wide"
      />

      <button
        onClick={onSearch}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 text-sm hover:bg-blue-700 transition"
      >
        <FaSearch size={16} />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
