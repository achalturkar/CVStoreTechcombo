import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

    // ⛔ Prevent non-numeric input & enforce max 10 digits
    const handleMobileChange = (e) => {
        const cleaned = e.target.value.replace(/\D/g, ""); // remove non-digits
        if (cleaned.length <= 10) {
            setRegister({ ...register, mobile: cleaned });
        }
    };

    // Handle input change for all other fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // ----------- Client-side Validation ------------
        if (register.password.length < 6) {
            setMessage("❌ Password must be at least 6 characters");
            return;
        }

        if (register.mobile.length !== 10) {
            setMessage("❌ Mobile number must be exactly 10 digits");
            return;
        }
        // -------------------------------------------------

        setLoading(true);

        try {
            const response = await fetch(`${baseurl}/auth/recruit/register`, {
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

            setMessage("✅ Registration successful! Redirecting...");
            setTimeout(() => navigate("/recruit/login"), 2000);

            setRegister({
                fullName: "",
                email: "",
                mobile: "",
                password: "",
                companyName: "",
            });
        } catch (err) {
            console.log(err);
            setMessage("❌ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
            {/* ------------------ HEADER ------------------ */}
            <header className="  p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/cvsto.webp" alt="TechCombo" className="h-10" />
                </div>

                <a
                    href="/candidate/register"
                    className="text-blue-600 px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                    Register As Candidate?
                </a>
            </header>

            {/* ------------------ BODY ------------------ */}
            <div className="flex flex-col md:flex-row justify-center items-center px-6 py-12 gap-10">
                {/* LEFT SIDE BENEFITS */}
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        Hire Smarter with{" "}
                        <span className="text-green-600">TechCombo</span>
                    </h2>

                    <p className="text-gray-600 text-lg">
                        🚀 Streamline recruitment with automation, candidate tracking,
                        and powerful hiring tools.
                    </p>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Post jobs & get AI-screened profiles</li>
                        <li>✔ Track applicants in a single dashboard</li>
                        <li>✔ Verified candidates with instant matching</li>
                        <li>✔ Reduce hiring time by 60%</li>
                    </ul>

                    <p className="text-sm text-gray-500 mt-4">
                        Join 500+ companies growing with TechCombo.
                    </p>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-center text-2xl font-bold text-blue-700 mb-4">
                        Employer Registration
                    </h2>

                    {message && (
                        <div
                            className={`mb-4 text-center font-semibold ${
                                message.includes("✅")
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="font-semibold text-gray-700">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={register.fullName}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="font-semibold text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={register.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="font-semibold text-gray-700">
                                Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                value={register.mobile}
                                onChange={handleMobileChange}
                                required
                                maxLength={10}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="10-digit mobile number"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="font-semibold text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full pr-10 focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-10 text-gray-500 hover:text-blue-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="font-semibold text-gray-700">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={register.companyName}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Enter company name"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition"
                        >
                            {loading ? "Registering..." : "Register as Employer"}
                        </button>

                        <p className="text-center text-gray-600 mt-3">
                            Already have an account?{" "}
                            <a
                                href="/recruit/login"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
