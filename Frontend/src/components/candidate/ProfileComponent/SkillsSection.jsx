import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTrash, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie"; // ✅ Correct library for frontend

const CandidateSkills = ({ candidateId }) => {
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // ✅ Get token from cookies
  const token = Cookies.get("jwtToken");

    const baseUrl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    if (!token) {
      console.warn("No JWT token found in cookies");
      return;
    }

    fetch(`${baseUrl}/candidate/${candidateId}/skills`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skills");
        return res.json();
      })
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, [candidateId, token]);

  const handleSave = () => {
    fetch(`/api/candidate/${candidateId}/skills`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(skills),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save skills");
        setIsEditing(false);
      })
      .catch((err) => console.error("Error saving skills:", err));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl max-w-md mx-auto mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
        {!isEditing ? (
          <FaEdit
            className="text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <FaSave
            className="text-green-600 cursor-pointer hover:text-green-800"
            onClick={handleSave}
          />
        )}
      </div>

      <div className="mt-3">
        {!isEditing ? (
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills added yet</p>
            )}
          </div>
        ) : (
          <div>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md mt-2"
              >
                <span>{skill}</span>
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDeleteSkill(index)}
                />
              </div>
            ))}

            <div className="flex mt-3 gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="border p-2 flex-grow rounded-md"
                placeholder="Add new skill"
              />
              <FaPlus
                className="text-blue-600 text-2xl cursor-pointer hover:text-blue-800"
                onClick={handleAddSkill}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSkills;
