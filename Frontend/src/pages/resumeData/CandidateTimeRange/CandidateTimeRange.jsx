import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateCard from "../../../components/CandidateCard/CandidateCard";
export default function CandidateRange() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const convertDate = (dt) => dt.replace("T", " ");

  const fetchCandidates = async () => {
    if (!startDate || !endDate) return alert("Please select both dates");

    setLoading(true);

    const url = `${baseUrl}/resume-data/range?startDate=${convertDate(startDate)}&endDate=${convertDate(endDate)}`;

    const res = await fetch(url);
    const data = await res.json();

    setCandidates(data);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Candidates by Date Range</h1>

      <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row gap-6 border border-gray-200">
        <div className="flex flex-col w-full">
          <label className="font-semibold">Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="font-semibold">End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <button
          onClick={fetchCandidates}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg h-fit mt-6 md:mt-0 hover:bg-blue-700 transition-all"
        >
          Show Candidates
        </button>
      </div>

      {loading && <p className="mt-6 text-lg font-semibold">Loading...</p>}

      {/* Total Count */}
      {candidates.length > 0 && (
        <p className="mt-8 text-xl font-bold">Total Candidates: {candidates.length}</p>
      )}

      {/* Candidate Cards */}
      <div className="flex flex-col gap-6 mt-6">
        {candidates.map((c) => (
          <CandidateCard
            key={c.id}
            c={c}
            searchKeyword={""}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
}
