import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import Pagination from "../../common/Pagination/Pagination";
import { handleDownload } from "../../../utils/handleDownload";
import { handleDelete } from "../../../utils/delete";
import CandidateDetailsModal from "../CandidateDetailsModel/CandidateDetailsModel";

const CandidateCard = () => {
  const [candidates, setCandidates] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async (page = pageNo) => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/candidate/all/${page}/9`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403)
        throw new Error("Access Denied: Unauthorized user.");

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      setCandidates(data.content || []);
      setTotalPages(data.totalPages || 0);
      setPageNo(data.number || 0);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData(pageNo);
  }, [pageNo]);

  return (
    <div className="p-1 lg:p-2 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        Candidate Profiles
      </h1>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.length > 0 ? (
          candidates.map((each) => (
            <div
              key={each.id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedCandidate(each)}
              >
                <h2 className="text-xl font-semibold">
                  {each.fullName}
                </h2>
                <p className="text-sm text-gray-600">{each.email}</p>
                <p className="text-sm text-gray-600">{each.phoneNumber}</p>
                <p className="mt-2">
                  <span className="font-medium">Company:</span>{" "}
                  {each.company || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Designation:</span>{" "}
                  {each.designation || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {each.experience || "N/A"} years
                </p>
                <p>
                  <span className="font-medium">Skills:</span>{" "}
                  {each.skills
                    ? each.skills.split(",").slice(0, 4).join(", ") +
                    (each.skills.split(",").length > 4 ? " ..." : "")
                    : "N/A"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-around mt-4 border-t pt-2 text-2xl text-gray-700">
                <button
                  title="Download CV"
                  onClick={() =>
                    handleDownload(each.id, each.fullName, each.skills, each.experience)
                  }
                  className="hover:text-blue-600"
                >
                  <MdDownloadForOffline />
                </button>

                <button
                  title="View Profile"
                  onClick={() => navigate(`/candidate/${each.id}`)}
                  className="hover:text-green-600"
                >
                  <IoEyeSharp />
                </button>

                <button
                  title="Edit Profile"
                  onClick={() => navigate(`/update/${each.id}`)}
                  className="hover:text-yellow-600"
                >
                  <FaEdit />
                </button>

                <button
                  title="Delete Profile"
                  onClick={() => handleDelete(each.id, fetchData)}
                  className="hover:text-red-600"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            No candidates found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            page={pageNo}
            totalPages={totalPages}
            onPageChange={(newPage) => setPageNo(newPage)}
          />
        </div>
      )}

      {/* Modal Popup */}
      {selectedCandidate && (
        <CandidateDetailsModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};

export default CandidateCard;
