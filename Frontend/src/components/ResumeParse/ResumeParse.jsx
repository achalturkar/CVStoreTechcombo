import React, { useState } from "react";
import Cookies from "js-cookie";

const ResumeParse = () => {
  const [files, setFiles] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setParsedData([]);
    setError(null);
  };

  // Upload and parse resumes
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const token = Cookies.get("jwtToken");
    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/candidate/parse-multiple-resumes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      // ✅ Check for HTTP status first
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Access denied (403). Please check your role or token.");
        } else if (response.status === 401) {
          throw new Error("Unauthorized. Please login again.");
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      const result = await response.json();

      // Expecting array of parsed results
      if (!Array.isArray(result)) {
        throw new Error("Unexpected response format from server.");
      }

      setParsedData(result);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Upload Multiple Resumes
      </h2>

      {/* File Input */}
      <input
        type="file"
        accept=".pdf,.docx"
        multiple
        className="w-full p-2 border rounded mb-4"
        id="files"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded w-full font-semibold`}
      >
        {loading ? "Uploading..." : "Upload & Parse Resumes"}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mt-4 text-red-600 font-semibold border border-red-300 p-3 rounded bg-red-50">
          ❌ Error: {error}
        </div>
      )}

      {/* Parsed Data Display */}
      {parsedData.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Parsed Results</h3>
          <div className="space-y-4">
            {parsedData.map((data, index) => (
              <div
                key={index}
                className={`p-3 border rounded ${
                  data.status === "duplicate"
                    ? "bg-red-50 border-red-400"
                    : "bg-green-50 border-green-400"
                }`}
              >
                <h4 className="font-semibold">
                  Resume {index + 1} –{" "}
                  <span
                    className={
                      data.status === "duplicate"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {data.message}
                  </span>
                </h4>

                <ul className="space-y-1 text-sm mt-2">
                  {Object.entries(data).map(
                    ([key, value]) =>
                      key !== "status" &&
                      key !== "message" && (
                        <li key={key}>
                          <strong>{key}:</strong> {value || "N/A"}
                        </li>
                      )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Navigation button to CV list */}
          <div className="mt-6 text-center">
            <a
              href="/cvlist"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Go to CV List
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeParse;
