import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CandidateDetail = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/candidate/${id}`);
        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        console.error("Error fetching candidate:", err);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleDownload = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/candidate/download/${id}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `[${candidate.fullName}_CV]`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error", err);
    }
  };

  const handleMail = () => {
    if (candidate?.email) {
      window.location.href = `mailto:${candidate.email}`;
    }
  };

  if (!candidate) return <p className="p-6">Loading candidate...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Candidate Details</h2>

      <div className="space-y-2">
        <p><strong>Full Name:</strong> {candidate.fullName}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Phone:</strong> {candidate.phoneNumber}</p>
        <p><strong>Address:</strong> {candidate.address}</p>
        <p><strong>Skills:</strong> {candidate.skills}</p>
        <p><strong>Experience:</strong> {candidate.experience}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Resume
        </button>
        <button
          onClick={() => navigate(`/update/${id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={handleMail}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Mail Candidate
        </button>
        <button
          onClick={() => window.open(`${baseUrl}/api/candidate/view/${id}`, "_blank")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          View Resume
        </button>
      </div>
    </div>
  );
};

export default CandidateDetail;
