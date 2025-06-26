import axios from "axios";

const API_URL = "http://localhost:8080/admin/auth"

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", response.data.token); // Store JWT Token
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};

export const isAdminLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  

export const logout = () => {
    localStorage.removeItem("token");
};

export const getAuthToken = () => {
    return localStorage.getItem("token");
};
