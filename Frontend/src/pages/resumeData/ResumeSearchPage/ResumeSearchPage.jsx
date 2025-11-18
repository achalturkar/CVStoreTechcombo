


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import AdvancedFilters from "../../../components/advancedFilter/AdvancedFilters/AdvancedFilters";
import SearchBar from "../../../components/advancedFilter/SearchBar/SearchBar";

const ResumeSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    experience: "",
    location: "",
    company: "",
    education: "",
    designation: "",
  });

  // Prefill from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setKeyword(params.get("keyword") || "");

    setFilters({
      experience: params.get("experience") || "",
      location: params.get("location") || "",
      company: params.get("company") || "",
      education: params.get("education") || "",
      designation: params.get("designation") || "",
    });
  }, [location.search]);

  const handleSearch = () => {
    const params = new URLSearchParams({
      keyword,
      ...filters,
    }).toString();

    navigate(`/filtered?${params}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* PAGE HEADING */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Candidate Search
        </h1>
        <p className="text-gray-600 text-sm mt-1">
           Find the best matching candidates using advanced filters
        </p>
      </div>



      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />


      <AdvancedFilters
        filters={filters}
        setFilters={setFilters}
        onApply={handleSearch}
      />


    </div>
  );
};

export default ResumeSearchPage;
