import axios from "axios";

const API = "http://localhost:8080/api/resume-data/search";

export const resumeApi = async (params) => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    // skip empty fields
    if (value === "" || value === null || value === undefined) return;

    // array values (company, education, designation, location)
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v && v.trim() !== "") queryParams.append(key, v);
      });
    } else {
      queryParams.append(key, value);
    }
  });

  const finalUrl = `${API}?${queryParams.toString()}`;
  console.log("Final API URL:", finalUrl);

  return axios.get(finalUrl);
};
