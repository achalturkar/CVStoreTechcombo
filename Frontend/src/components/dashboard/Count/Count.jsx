import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";


const token = Cookies.get("jwtToken");

const Count = () =>{

    const[count, setCount] = useState();
      const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const fetchCount= async() =>{
       try{
        const res = await fetch(`${baseUrl}/candidate/count`, {
            method: "GET",
            headers: {
                Authorization : `Bearer ${token}`,
                "Content-Type":"application/json"

            }
        });
        const data = await res.json();
        setCount(data);
       }catch(err){
          console.error("Error to count",err)
       }

    }

     useEffect(()=>{
          fetchCount();
     },[count])




    return (
        <div className="p-4  border-2 rounded-xl ">
            <h1 className="font-semibold text-lg  ">Total candidate</h1>
            <h2 className="font-extrabold">{count}</h2>

        
        </div>
    )
}

export default Count;