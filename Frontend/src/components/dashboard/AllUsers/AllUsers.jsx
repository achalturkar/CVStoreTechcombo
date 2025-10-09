import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const AllUsers = () => {

    const[users , setUsers]= useState();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = Cookies.get("jwtToken");

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${baseUrl}/superadmin/users`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = await response.json();
            setUsers(data);
            console.log(data);

        } catch (e) {
            console.log(e);
        }
    }

      useEffect(() => {
            fetchAllUsers();
        }, [])



    return (
        <>

        <h1>Users List</h1>
         
         <ul className="list-disc pl-5 space-y-1">
        {users.length > 0 ? (
          users.map((each) => (
            <li key={each.id}>
              {each.fullName} ({each.mobile})
            </li>
          ))
        ) : (
          <li>No Users found</li>
        )}
      </ul>



        </>
    )
}

export default AllUsers;