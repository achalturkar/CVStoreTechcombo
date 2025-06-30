"use client"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import React from 'react';
const CandidateTable = () => {
    const [candidates, setCandidates] = useState([]);
    const [updateForm, setUpdateForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        experience: "",
        skills: "",
        address: "",
    });
      const navigate = useNavigate();


    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("https://cvstoretechcombo.railway.internal:8080/api/candidate/all");
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDownload = async (id, fullName, skills, experience) => {
        try {
            const response = await fetch(`https://cvstoretechcombo.railway.internal:8080/api/candidate/download/${id}`, {
                method: "GET"
            });

            if (!response.ok) throw new Error("Failed to download file");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `[Techcombo_${fullName}_${skills}_${experience}]`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download CV.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://cvstoretechcombo.railway.internal:8080/api/candidate/delete/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Delete failed");

            alert("Candidate deleted successfully.");
            fetchData();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete candidate.");
        }
    };

    const loadCandidateForUpdate = async (id) => {
        try {
            const res = await fetch(`https://cvstoretechcombo.railway.internal:8080/api/candidate/${id}`);
            const data = await res.json();
            setUpdateForm(data);
            setSelectedId(id);
            setShowUpdateForm(true);
        } catch (error) {
            console.error("Failed to load candidate for update:", error);
        }
    };

    const handleUpdateSave = async () => {
        try {
            const response = await fetch(`https://cvstoretechcombo.railway.internal:8080/api/candidate/update/${selectedId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateForm)
            });

            if (!response.ok) throw new Error("Update not working");

            alert("Candidate updated successfully.");
            setShowUpdateForm(false);
            fetchData();
        } catch (error) {
            console.error("Update Error", error);
            alert("Failed to update candidate.");
        }
    };

    return (


        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Candidate Details Table</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border shadow-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Sr. No.</th>
                            <th className="border p-2">Full Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Mobile Number</th>
                            <th className="border p-2">Experience</th>
                            <th className="border p-2">Skills</th>
                            <th className="border p-2">CV</th>
                            <th className="border p-2">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((each, index) => (
                            <tr key={each.id} className="text-center hover:bg-gray-100">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{each.fullName}</td>
                                <td className="border p-2">{each.email}</td>
                                <td className="border p-2">{each.phoneNumber}</td>
                                <td className="border p-2">{each.experience}</td>
                                <td className="border p-2">{each.skills}</td>
                                <td className="border p-2">
                                    <button className="text-blue-900 text-3xl cursor-pointer"
                                        onClick={() => handleDownload(each.id, each.fullName, each.skills, each.experience)}
                                    >
                                        <MdDownloadForOffline />
                                    </button>
                                    <button className="text-red-800 text-3xl cursor-pointer"
                                        onClick={() => handleDelete(each.id)}
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                                <td className="border p-2">
                                    <button className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-red-700 cursor-pointer"
                                        onClick={() => navigate(`/update/${each.id}`)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CandidateTable;
