import { useState, useEffect } from "react";
import React from "react";

const Count = () =>{

    const[count, setCount] = useState();
      const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const fetchCount= async() =>{
       try{
        const res = await fetch(`${baseUrl}/api/candidate/count`);
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
        <div className="p-4 ">
            <h1>Total candidate</h1>
            <h2>{count}</h2>

        
        </div>
    )
}

export default Count;