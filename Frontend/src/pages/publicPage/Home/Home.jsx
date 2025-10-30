import React, { useEffect } from 'react';

import Login from '../../auth/recruiter/Login/Login';
import PublicNavbar from '../../../components/publicComponent/Navbar/PublicNavbar/PublicNavbar';
import PublicHeroSection from '../../../components/publicComponent/PublicHeroSection/PublicHeroSection';
import FeaturedCategories from '../../../components/publicComponent/FeaturedCategories/FeaturedCategories ';
import PublicFooter from '../../../components/publicComponent/Footer/PublicFooter';

const Home = () =>{


   


    return(
        <div>
            <PublicNavbar/>

            <PublicHeroSection/>

            <FeaturedCategories/>


            <Login/>


             <PublicFooter/>

            {/* <AllUsers/> */}
        
        
        
        </div>
    )
}
export default Home;