import React from 'react';
import { useState } from "react";

const UploadCandidate = () =>{

     const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    experience: "",
    skills: "",
    address: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("experience", formData.experience);
    data.append("skills", formData.skills);
    data.append("address", formData.address);
    data.append("file", formData.file);

    const api = "https://cvstoretechcombo.railway.internal:8080/api/candidate/upload";
    const options = {
      method: "POST",
      body: data,
    };

    try {
      const response = await fetch(api, options);
      const res = await response.text();

      if (response.ok) {
        alert("Candidate uploaded successfully!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          experience: "",
          skills: "",
          address: "",
          file: null,
        });
        document.getElementById("file").value = "";
      } else {
        alert("Failed to upload candidate. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };



    return(
        <div className="p-1 md:p-8 lg:p-20 m-1 md:mx-20 lg:mx-24">
      <div className="my-8">
        <h1 className="text-xl font-bold text-center">Upload Employee Details</h1>
      </div>

      <form className="px-2 md:px-40" onSubmit={handleSubmit}>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 md:px-20">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-lg font-bold">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-lg font-bold">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              pattern="[6789][0-9]{9}"
              title="Please enter valid phone number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col">
            <label htmlFor="experience" className="text-lg font-bold">
              Experience <span className="text-red-500">*</span>
            </label>
            <select
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              required
            >
              <option value="">Select</option>
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
              <option value="20+">20+</option>
            </select>
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <label htmlFor="skills" className="text-lg font-bold">
              Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-lg font-bold">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              required
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <label htmlFor="file" className="text-lg font-bold">
              Resume File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="focus:outline-blue-300 border border-gray-500 rounded-lg p-1"
              accept="application/pdf"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8 col-span-2">
            <input
              type="submit"
              className="p-2 bg-blue-500 font-bold text-xl text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadCandidate;