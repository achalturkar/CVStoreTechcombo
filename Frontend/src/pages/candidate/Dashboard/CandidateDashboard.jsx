import React, { useEffect } from "react";
import CandidateNavbar from "../../../components/candidate/Navbar/CandidateNavbar";
import AppliedJobs from "../../../components/candidate/AppliedJobs";
import WebinarSection from "../../../components/candidate/WebinarSection";
import Cookies from "js-cookie";


const token = Cookies.get("jwtToken")

const CandidateDashboard = () => {

  useEffect(
    ()=>{

    }, [token]
  )
  return (
    <div className="bg-gray-50 min-h-screen">
      <CandidateNavbar/>
      <div className="pt-20 px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-6">
            <AppliedJobs/>
            {/* <ProblemOfTheDay /> */}
          </div>

          {/* Right content */}
          <div className="space-y-6">
            <WebinarSection/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
