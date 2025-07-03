// src/pages/UpdateCandidate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CandidateUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    experience: "",
    skills: "",
    address: "",
  });

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/candidate/${id}`);
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Error loading candidate:", err);
        alert("Failed to load candidate");
      }
    };

    loadCandidate();
  }, [id, baseUrl]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/candidate/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Candidate updated successfully");
      navigate("/cvlist");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update candidate");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Candidate</h2>
      <label htmlFor="name">FullName</label>
      <input
        className="w-full border p-2 mb-2"
        type="text"
        id="name"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="w-full border p-2 mb-2"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <label htmlFor="name">Phone Number</label>
      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
      />
      <label htmlFor="exp">Experience</label>
      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Experience"
        id="exp"
        value={form.experience}
        onChange={(e) => setForm({ ...form, experience: e.target.value })}
      />
      <label htmlFor="skill">Skills</label>
      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Skills"
        id="skill"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />
      <label htmlFor="address">Address</label>
      <input
        className="w-full border p-2 mb-4"
        type="text"
        id="address"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      {/* Remove file input or implement resume update if needed */}
      {/* <input
        type="file"
        className="w-full border p-2 mb-4"
        accept=".pdf,.doc,.docx"
        disabled
      /> */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleUpdate}
      >
        Save Changes
      </button>
    </div>
  );
};

export default CandidateUpdate;
