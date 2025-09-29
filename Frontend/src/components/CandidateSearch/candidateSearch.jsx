

import React, { useState } from 'react';

const CandidateSearch = () => {
    const [mobile, setMobile] = useState('');
    const [candidate, setCandidate] = useState(null);
    const [error, setError] = useState('');

      const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const handleSearch = async () => {
        if (!mobile) {
            setError("Please enter mobile number");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/candidate/search/${mobile}`);
            if (!response.ok) {
                throw new Error("Candidate not found");
            }
            const data = await response.json();
            setCandidate(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setCandidate(null);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Search Candidate by Mobile Number</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="border px-4 py-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Search
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {candidate && (
                <div className="border p-4 mt-4 bg-gray-100">
                    <p><strong>Name:</strong> {candidate.fullName}</p>
                    <p><strong>Email:</strong> {candidate.email}</p>
                    <p><strong>Mobile:</strong> {candidate.mobileNumber}</p>
                    <p><strong>Experience:</strong> {candidate.experience}</p>
                </div>
            )}
        </div>
    );
};

export default CandidateSearch;
