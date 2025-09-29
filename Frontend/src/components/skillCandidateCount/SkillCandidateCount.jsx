import { useState } from "react";


const SkillCandidateCount = () =>{
    const[skillcount, setSkillCount] = useState(0);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const fetchData = async () =>{
          const res = await fetch(`${baseUrl}/api/candidate/count/${skill}`)
          const data= res.json();
          
    }

    return(
        <>
        
        
        </>
    )
}

export default SkillCandidateCount;