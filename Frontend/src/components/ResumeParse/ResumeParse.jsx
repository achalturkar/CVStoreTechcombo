import React, { useState } from 'react';

const ResumeParse = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setParsedData(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/api/candidate/parse-resume`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      setParsedData(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSubmit = async () => {
    if (!parsedData || !file) return;

    const data = new FormData();
    data.append("fullName", parsedData.fullName || "");
    data.append("email", parsedData.email || "");
    data.append("phoneNumber", parsedData.phoneNumber || "");
    data.append("experience", parsedData.experience || "");
    data.append("skills", parsedData.skills || "");
    data.append("address", parsedData.address || "");
    data.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/api/candidate/upload`, {
        method: "POST",
        body: data,
      });

      const res = await response.text();

      if (response.ok) {
        alert("Candidate uploaded successfully!");
        setFile(null);
        setParsedData(null);
        document.getElementById("file").value = "";
      } else {
        alert("Failed to upload candidate. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Resume for Parsing</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        className="w-full p-2 border rounded mb-4"
        id="file"
        onChange={handleFileChange}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Upload & Parse
      </button>

      {parsedData && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Parsed Data</h3>
          <ul className="space-y-2">
            {Object.entries(parsedData).map(([key, value]) => (
              <li key={key} className="text-sm">
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Submit Candidate
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500 font-semibold">Error: {error}</div>
      )}
    </div>
  );
};

export default ResumeParse;
