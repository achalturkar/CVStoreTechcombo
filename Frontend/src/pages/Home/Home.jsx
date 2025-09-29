import React from 'react';
import UploadCandidate from "/src/components/UploadCandidate/UploadCandidate"
import Navbar from '../../components/Navbar/Navbar';
import Count from '../../components/dashboard/Count/Count';
import RecentResume from '../../components/dashboard/RecentCandidate/RecentResume';
import ResumeUploadChart from '../../components/dashboard/ResumeUploadChart/ResumeUploadChart';

const Home = () =>{


    return(
        <div>

            <Count/>
            <RecentResume/>

            <ResumeUploadChart/>
        
        
        
        </div>
    )
}
export default Home;