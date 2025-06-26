// src/pages/UpdateCandidate.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CandidateUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        experience: "",
        skills: "",
        address: "",
        file: ""
    });

    useEffect(() => {
        const loadCandidate = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/candidate/${id}`);
                const data = await res.json();
                setForm(data);
            } catch (err) {
                console.error("Error loading candidate:", err);
                alert("Failed to load candidate");
            }
        };

        loadCandidate();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/candidate/update/${id}`, {
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
            <input
                className="w-full border p-2 mb-2"
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <input
                className="w-full border p-2 mb-2"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                className="w-full border p-2 mb-2"
                type="text"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />
            <input
                className="w-full border p-2 mb-2"
                type="text"
                placeholder="Experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
            <input
                className="w-full border p-2 mb-2"
                type="text"
                placeholder="Skills"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
            <input
                className="w-full border p-2 mb-4"
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
                type="file"
                className="w-full border p-2 mb-4"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />
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
