import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../../api/resumeApi";
const CandidateDetailsPage = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    resumeApi.getCandidate(id).then((res) => setCandidate(res.data));
  }, []);

  if (!candidate) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-5 max-w-4xl mx-auto bg-white shadow rounded-xl">

      <h1 className="text-2xl font-bold">{candidate.fullName}</h1>

      <p className="mt-2 text-lg text-gray-600">{candidate.designation}</p>

      <p className="mt-1 text-gray-500">{candidate.location}</p>

      <hr className="my-4" />

      <h3 className="font-semibold">Experience:</h3>
      <p>{candidate.totalExperience} years</p>

      <h3 className="font-semibold mt-4">Skills:</h3>
      <p>{candidate.skills}</p>

      <h3 className="font-semibold mt-4">Education:</h3>
      <p>{candidate.education}</p>

      <h3 className="font-semibold mt-4">Resume:</h3>
      <a
        href={candidate.resumeUrl}
        target="_blank"
        className="text-blue-600 underline"
      >
        Download Resume
      </a>

    </div>
  );
};

export default CandidateDetailsPage;
