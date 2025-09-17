import { IoMdArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {

    const navigate = useNavigate();

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="p-1 rounded-full bg-blue-100"
            >

                <IoMdArrowRoundBack />

            </button>
            <button
                onClick={() => navigate(+1)}
                className="p-1 rounded-full bg-blue-100"
            >

                <FaArrowRight />

            </button>
        </div>
    )
}
export default BackButton;