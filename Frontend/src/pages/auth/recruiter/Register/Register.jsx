import React, { useState } from "react";
import { FaBuilding, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [register, setRegister] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        companyName: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const baseurl = import.meta.env.VITE_API_BASE_URL;

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${baseurl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(register),
            });

            if (response.status === 409) {
                setMessage("❌ Email already registered! Please login.");
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            setMessage("✅ Registration successful!");
            console.log("Registered Employer:", data);
            setTimeout(()=> navigate("/recruit/login"),2000)

            setRegister({
                fullName: "",
                email: "",
                mobile: "",
                password: "",
                companyName: "",
            });
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center mt-2 px-6  py-8">
            {/* Left Section: Employer Benefits */}
            <div className=" md:flex flex-col justify-center md:w-1/2 space-y-6">
                <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
                    Hire Smarter with <span className="text-green-400">TechCombo</span>
                </h2>
                <p className="text-gray-600 text-lg">
                    🚀 Simplify recruitment. Post verified jobs, review top applicants, and
                    manage your hiring pipeline with ease.
                </p>

                <ul className="space-y-3 text-gray-700">
                    <li>✅ Post jobs & get AI-screened resumes</li>
                    <li>✅ Manage multiple job listings in one dashboard</li>
                    <li>✅ Connect directly with skilled professionals</li>
                    <li>✅ Save time with automated candidate tracking</li>
                </ul>

                <p className="text-sm text-gray-500 mt-4">
                    Join 500+ companies already hiring smarter with TechCombo.
                </p>
            </div>

            {/* Right Section: Registration Form */}
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-[1.01]">
                <div className="flex items-center justify-center mb-4 text-blue-600">
                    <h2 className="text-xl font-bold">Employer Registration</h2>
                </div>

                {message && (
                    <p
                        className={`text-center mb-4 font-medium ${message.includes("✅")
                                ? "text-green-600"
                                : message.includes("already")
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Full Name
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={register.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Email
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={register.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Mobile Number
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="mobile"
                            value={register.mobile}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition"
                            placeholder="Enter your mobile number"
                        />
                    </div>

                    {/* Password  */}
                    <div className="relative">
                        <label className="block text-gray-700 font-semibold mb-1">
                            Password
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={register.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition pr-10"
                            placeholder="Create a password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Company Name
                            <span className="text-red-500 ">*</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={register.companyName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition"
                            placeholder="Enter your company name"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
                    >
                        {loading ? "Registering..." : "Register as Employer"}
                    </button>

                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <a
                            href="/recruit/login"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
