import React from "react";
import { logout } from "../../../utils/logout";
import { useNavigate } from "react-router-dom";


const Logout = () =>{

    const navigate = useNavigate();

    return(
         <button
        onClick={() => logout(navigate)}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
      >
        Logout
      </button>
    )
}

export default Logout;