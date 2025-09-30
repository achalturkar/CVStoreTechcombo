import { useEffect, useState } from "react";
import React from "react";

const RecentResume = () => {

    const [candidates, setCandidates] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const fetchRecentCandidate = async () => {
        try {
            const res = await fetch(`${baseUrl}/candidate/recent`);
            const data = await res.json();
            setCandidates(data.content);
            console.log(data.content);

        }
        catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
        fetchRecentCandidate();
    }, [])




     return (
    <div>

        <h1>Recent 5 Resume Uploaded</h1>
      <ul className="list-disc pl-5 space-y-1">
        {candidates.length > 0 ? (
          candidates.map((each) => (
            <li key={each.id}>
              {each.fullName} ({each.phoneNumber})
            </li>
          ))
        ) : (
          <li>No candidates found</li>
        )}
      </ul>
    </div>
  );
}

export default RecentResume;