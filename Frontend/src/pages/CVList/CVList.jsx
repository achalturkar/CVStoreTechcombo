import React from "react";
import CandidateTable from "../../components/CandidateTable/CandidateTable";
import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";

const CVList = () =>{

    return(

        <>
        <Navbar/>

        <Filter/>

        <CandidateTable/>
        
        
        
        </>
    )
}

export default CVList;