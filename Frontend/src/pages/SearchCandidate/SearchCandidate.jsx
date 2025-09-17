import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import { IoEyeSharp } from "react-icons/io5";

const SearchCandidate = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);

    return (
        <div className="container mx-auto p-4">
            <Filter onResults={setCandidates} />

            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Results:</h3>
                {candidates.length > 0 ? (
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Phone</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Skills</th>
                                <th className="border p-2">Address</th>
                                <th className="border p-2">CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((c) => (
                                <tr key={c.id}>
                                    <td className="border p-2">{c.fullName}</td>
                                    <td className="border p-2">{c.phoneNumber}</td>
                                    <td className="border p-2">{c.email}</td>
                                    <td className="border p-2">{c.skills}</td>
                                    <td className="border p-2">{c.address}</td>
                                    <td className="border p-2">
                                        <button
                                            className="text-black-800 text-2xl cursor-pointer"
                                            onClick={() => navigate(`/candidate/${c.id}`)}
                                        >
                                            <IoEyeSharp />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No candidates found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchCandidate;
