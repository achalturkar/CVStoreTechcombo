import React from 'react';
import UploadCandidate from "/src/components/UploadCandidate/UploadCandidate"
import Navbar from '../../components/Navbar/Navbar';
import Count from '../../components/dashboard/Count/Count';
import RecentResume from '../../components/dashboard/RecentCandidate/RecentResume';

const Home = () =>{


    return(
        <div>

            <Count/>
            <RecentResume/>
        
        
        
        </div>
    )
}
export default Home;