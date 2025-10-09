import React, { useEffect } from 'react';
import UploadCandidate from "/src/components/UploadCandidate/UploadCandidate"
import Count from '../../components/dashboard/Count/Count';
import RecentResume from '../../components/dashboard/RecentCandidate/RecentResume';
import ResumeUploadChart from '../../components/dashboard/ResumeUploadChart/ResumeUploadChart';
import AllUsers from '../../components/dashboard/AllUsers/AllUsers';
import UserProfile from '../../components/UserProfile/UserProfile';

const Home = () =>{


   


    return(
        <div>

            <Count/>
            <RecentResume/>

            <ResumeUploadChart/>

            <UserProfile/>


            {/* <AllUsers/> */}
        
        
        
        </div>
    )
}
export default Home;