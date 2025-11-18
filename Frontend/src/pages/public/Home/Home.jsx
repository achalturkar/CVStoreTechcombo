import React from "react";

import PublicNavbar from "../../../components/publicComponent/Navbar/PublicNavbar/PublicNavbar";
import PublicHeroSection from "../../../components/publicComponent/PublicHeroSection/PublicHeroSection";
import MoveBoard from "../../../components/publicComponent/Board/MoveBoard";

const Home = () =>{


    return(
        <>

                <PublicNavbar/>
                <PublicHeroSection/>
                <MoveBoard/>
                

        <h1>Home</h1>
        </>
    )
}

export default Home;