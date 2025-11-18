import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    gender: "",
    address: "",
    resumeHeadline: "",
    profileType: "",
    dob: "",
  });

  const candidateId = Cookies.get("id");
  const token = Cookies.get("token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchData = async () => {
      if (!candidateId || !token) {
        console.warn("Candidate not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}/personal-info/candidate/${1}`,
          {
            method: "GET",
            credentials: "include", 
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 404) {
          setPersonalInfo(null);
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPersonalInfo(data);
        setFormData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [candidateId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const method = personalInfo ? "PUT" : "POST";
      const url = personalInfo
        ? `${baseUrl}/personal-info/${personalInfo.id}`
        : `${baseUrl}/personal-info/${1}`;

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      const updated = await response.json();
      setPersonalInfo(updated);
      setIsEditing(false);
      alert("Personal info saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving info");
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
        Personal Information
        {!isEditing && (
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        )}
      </h2>

      {isEditing ? (
        <form className="space-y-4">
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="border p-2 w-full rounded-md"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 w-full rounded-md"
          />
          <input
            type="text"
            name="resumeHeadline"
            value={formData.resumeHeadline}
            onChange={handleChange}
            placeholder="Resume Headline"
            className="border p-2 w-full rounded-md"
          />
          <input
            type="text"
            name="profileType"
            value={formData.profileType}
            onChange={handleChange}
            placeholder="Profile Type"
            className="border p-2 w-full rounded-md"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      ) : personalInfo ? (
        <div className="text-gray-700 space-y-2">
          <p><strong>Gender:</strong> {personalInfo.gender}</p>
          <p><strong>Address:</strong> {personalInfo.address}</p>
          <p><strong>Resume Headline:</strong> {personalInfo.resumeHeadline}</p>
          <p><strong>Profile Type:</strong> {personalInfo.profileType}</p>
          <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
        </div>
      ) : (
        <div className="text-gray-500 text-center">
          No personal information found.
          <button
            className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md mx-auto"
            onClick={() => setIsEditing(true)}
          >
            Add Info
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
