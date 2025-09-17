import React from "react";

const Forget = ()=>{





    return(
        <>


        <div className="flex flex-col justify-start items-center gap-2 ">
            <input type="email" 
            placeholder="Enter Your Email"
              className=" border-b-2"
            
            />

            <button className="bg-blue-600 text-white font-bold text-md p-1 rounded  ">Forget password</button>
        </div>
        
        
        </>
    )
}

export default Forget;