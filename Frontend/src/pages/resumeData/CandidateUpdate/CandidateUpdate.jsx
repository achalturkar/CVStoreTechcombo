import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CandidateUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("jwtToken");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    experience: "",
    skills: "",
    address: "",
    company: "",
    designation: "",
    resume: null,
  });

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        const res = await fetch(`${baseUrl}/resume-data/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setForm((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error loading candidate:", err);
        alert("Failed to load candidate details");
      }
    };
    loadCandidate();
  }, [id, baseUrl, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      const response = await fetch(`${baseUrl}/resume-data/update/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Update failed");

      alert("✅ Candidate updated successfully!");
      navigate("/cvlist");
    } catch (error) {
      console.error("Update Error:", error);
      alert("❌ Failed to update candidate");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Candidate Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g. 3 years"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Java"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter full address"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Resume Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Resume (PDF / DOC)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CandidateUpdate;
