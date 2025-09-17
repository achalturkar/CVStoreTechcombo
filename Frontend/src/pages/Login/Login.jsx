import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();

    return (

        <div className="flex flex-col  w-full md:flex-row justify-center items-center gap-4  ">

            <div className="min-w-lg flex flex-col md:flex-row  gap-4  mt-40 ">
                {/* <div className="w-1/2">
            //image
                </div> */}



                <div className=" gap-4 w-80">

                    <h1 className="text-center font-bold text-lg ">Login</h1>

                    <form className="flex flex-col gap-2">
                        <input type="email"
                            className="border-b-2 p-1 outline-none "
                            placeholder="Enter Email"


                        />
                        <input type="password"
                            className="border-b-2 p-1 outline-none"
                            placeholder="Enter Password"


                        />

                        <div >
                            <Link to='/forget' className="text-blue-600 text-sm no-underline hover:underline ">Forget Password? </Link>
                        </div>

                        <button onClick={()=>{navigate('/')}} className="w-full p-1 text-white bg-blue-600 rounded-full font-bold mt-2">Login</button>


                    </form>

                </div>

            </div>

        </div>
    )



}
export default Login;