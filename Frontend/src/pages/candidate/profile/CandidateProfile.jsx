import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import CandidateSkills from "../../../components/candidate/ProfileComponent/SkillsSection";

const CandidateProfile = () => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("jwtToken");

    const baseUrl = import.meta.env.VITE_API_BASE_URL;


  // Fetch logged-in candidate profile (id, name, headline etc.)
  const loadCandidate = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/auth/candidate/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to get candidate");
      const data = await res.json();
      setCandidate(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadCandidate();
  }, [loadCandidate]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!candidate) return <div className="p-6">Please login</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <img
          src={candidate.profilePhotoUrl || "/default-avatar.png"}
          alt={candidate.fullName}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{candidate.fullName}</h1>
          <p className="text-gray-600">{candidate.resumeHeadline || "— Add resume headline —"}</p>
        </div>
      </div>

      {/* Personal Info (simplified, inline edit can be added similarly) */}
      <section className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          {/* Add small edit control if needed */}
        </div>
        <div className="text-gray-700">
          <p><strong>Phone:</strong> {candidate.phone}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
        </div>
      </section>

      {/* Skills */}
      <CandidateSkills candidateId={candidate.id} />

      {/* Education, Experience, Resume sections: follow modal pattern (not included) */}
      <section className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Education</h2>
          <button className="text-blue-600 hover:underline">Manage</button>
        </div>
        {/* display education list here */}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Experience</h2>
          <button className="text-blue-600 hover:underline">Manage</button>
        </div>
        {/* display experience list here */}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Resume</h2>
          <button className="text-blue-600 hover:underline">Upload / Replace</button>
        </div>
        {/* download / view link */}
      </section>
    </div>
  );
};

export default CandidateProfile;
