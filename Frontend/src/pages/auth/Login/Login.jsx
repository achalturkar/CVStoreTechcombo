import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    errMsg: ""
  });

  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const userDetailSubmit = async (e) => {
    e.preventDefault();

    const userDetail = {
      email: value.email,
      password: value.password,
    };

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetail),
    };

    try {
      const response = await fetch(`${baseUrl}/auth/login`, option);
      const data = await response.json();

      console.log("Response Data:", data);

      if (response.ok) {
        Cookies.set("jwtToken", data.token, { expires: 7 }); 
        navigate("/"); 
      } else {
        setValue({ ...value, errMsg: data.message || "Login failed" });
      }
    } catch (error) {
      console.log("Error:", error);
      setValue({ ...value, errMsg: "Something went wrong" });
    }
  };

  return (
    <div className="flex flex-col w-full md:flex-row justify-center items-center gap-4">
      <div className="min-w-lg flex flex-col md:flex-row gap-4">
        <div className="gap-4 w-80">
          <h1 className="text-center font-bold text-lg">Login</h1>

          <form onSubmit={userDetailSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              id="email"
              name="email"
              className="border-b-2 p-1 outline-none"
              placeholder="Enter Email"
              value={value.email}
              onChange={(e) =>
                setValue({ ...value, email: e.target.value })
              }
            />
            <input
              type="password"
              id="password"
              name="password"
              className="border-b-2 p-1 outline-none"
              placeholder="Enter Password"
              value={value.password}
              onChange={(e) =>
                setValue({ ...value, password: e.target.value })
              }
            />

            {value.errMsg && (
              <p className="text-red-500 text-sm text-center">{value.errMsg}</p>
            )}

            <div>
              <Link
                to="/forget"
                className="text-blue-600 text-sm no-underline hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full p-1 text-white bg-blue-600 rounded-full font-bold mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
