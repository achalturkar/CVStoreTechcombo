import axios from "axios";

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getTotalCount = () => axios.get(`${baseUrl}/resume-data/count`);
export const getVisualUploads = (filter) =>
  axios.get(`${API}/visuals?filter=${filter}`);
export const getRecentCandidates = () => axios.get(`${baseUrl}/recent`);
export const getSkillCount = (skill) => axios.get(`${baseUrl}/count/${skill}`);
