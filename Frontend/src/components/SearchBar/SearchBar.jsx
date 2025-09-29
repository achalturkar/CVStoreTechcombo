import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";

const SearchBar = () => {
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { keyword, setKeyword } = useContext(SearchContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const timerRef = useRef(null);

      const baseUrl = import.meta.env.VITE_API_BASE_URL;


  // fetch suggestions
  const fetchSuggestions = async (q) => {
    if (!q || !q.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/api/candidate/search/filter?keyword=${encodeURIComponent(q)}`
      );
      const data = await res.json();

      let list;
      if (Array.isArray(data)) {
        list = data;
      } else if (data && Array.isArray(data.content)) {
        list = data.content;
      } else {
        list = [];
      }

      setResults(list);
      setShowDropdown(true);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setResults([]);
      setShowDropdown(true);
    }
  };

  // handle input
  const handleInputChange = (value) => {
    setKeyword(value);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value || !value.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 250);
  };

  // close dropdown on outside click / ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="flex-1 flex justify-center px-4 relative" ref={dropdownRef}>
      <div className="w-full md:w-2/5 flex items-center text-center rounded-full px-3 py-1 gap-3 border-2">
        <FaSearch className="text-black ml-2" />

        <input
          type="text"
          placeholder="Search candidates..."
          value={keyword}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              navigate(`/searchResult?keyword=${encodeURIComponent(keyword)}&page=0`);
              setShowDropdown(false);
            }
          }}
          className="w-full bg-transparent focus:outline-none"
        />
      </div>

      {/* Dropdown suggestions */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full md:w-2/5 bg-white shadow-lg rounded-lg border max-h-[500px] overflow-y-auto z-50">
          {results.map((c) => (
            <div
              key={c.id}
              className="p-3 border-b cursor-pointer hover:bg-gray-50"
              onClick={() => {
                navigate(`/candidate/${c.id}`);
                setShowDropdown(false);
              }}
            >
              <h3 className="font-bold">{c.fullName}</h3>
              <h3 className="font-semibold">{c.designation}</h3>
              <p className="text-sm text-gray-600">
                {c.email} • {c.phoneNumber}
              </p>
              <p className="text-sm text-gray-600 truncate">
                Skills: {c.skills?.split(",").slice(0, 5).join(", ")}
              </p>
            </div>
          ))}

          <div className="text-center">
            <Link
              to={`/searchResult?keyword=${encodeURIComponent(keyword)}&page=0`}
              className="block text-blue-600 p-2 font-semibold hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
            >
              Show more results
            </Link>
          </div>
        </div>
      )}

      {/* No results */}
      {showDropdown && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full md:w-2/5 bg-white shadow-lg rounded-lg border p-3 text-gray-500">
          No candidates found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
