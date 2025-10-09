import Cookies from "js-cookie"

export const logout = (navigate) => {

    const token = Cookies.remove("jwtToken");



    sessionStorage.clear;
    localStorage.clear;

    navigate("/login");

    alert("You have been logged out successfully!");



}