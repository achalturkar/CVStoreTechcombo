// import React, { useState } from "react";

// const ResumeParse = () => {
//   const [files, setFiles] = useState([]); // store multiple files
//   const [parsedData, setParsedData] = useState([]);
//   const [error, setError] = useState(null);

//   const baseUrl = import.meta.env.VITE_API_BASE_URL;

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files)); // convert FileList to array
//     setParsedData([]);
//     setError(null);
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) {
//       alert("Please select at least one file.");
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file)); // important: backend expects "files"

//     try {
//       const response = await fetch(`${baseUrl}/api/candidate/parse-multiple-resumes`, {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || "Upload failed");

//       setParsedData(result); // result will be a list (array of maps)
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-2xl font-bold text-center mb-6">Upload Multiple Resumes</h2>

//       <input
//         type="file"
//         accept=".pdf,.docx"
//         multiple // ✅ allow multiple file selection
//         className="w-full p-2 border rounded mb-4"
//         id="files"
//         onChange={handleFileChange}
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//       >
//         Upload & Parse Resumes
//       </button>

//       {parsedData.length > 0 && (
//         <div className="mt-6 border-t pt-4">
//           <h3 className="text-lg font-semibold mb-2">Parsed Results</h3>
//           <div className="space-y-4">
//             {parsedData.map((data, index) => (
//               <div key={index} className="p-3 border rounded bg-gray-50">
//                 <h4 className="font-semibold">Resume {index + 1}</h4>
//                 <ul className="space-y-1 text-sm">
//                   {Object.entries(data).map(([key, value]) => (
//                     <li key={key}>
//                       <strong>{key}:</strong> {value}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* {error && <div className="mt-4 text-red-500 font-semibold">Error: {error}</div>} */}
//     </div>
//   );
// };

// export default ResumeParse;

import React, { useState } from "react";

const ResumeParse = () => {
  const [files, setFiles] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setParsedData([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(
        `${baseUrl}/api/candidate/parse-multiple-resumes`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Upload failed");

      // ✅ Expect result as an array of objects
      setParsedData(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Upload Multiple Resumes
      </h2>

      <input
        type="file"
        accept=".pdf,.docx"
        multiple
        className="w-full p-2 border rounded mb-4"
        id="files"
        onChange={handleFileChange}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Upload & Parse Resumes
      </button>

      {error && (
        <div className="mt-4 text-red-500 font-semibold">Error: {error}</div>
      )}

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
                  {Object.entries(data).map(([key, value]) => (
                    key !== "status" && key !== "message" && (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ✅ Navigation button to CV list */}
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
