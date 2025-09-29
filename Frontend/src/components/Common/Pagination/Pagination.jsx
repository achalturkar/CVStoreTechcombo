
import React from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleFill } from "react-icons/ri";



const Pagination = ({page, totalPages,onPageChange }) => {


    return (
        <>
            <div className="flex justify-center text-center items-center mt-4 space-x-2 bg-white rounded-xl p-2  shadow-md" >
                <button
                    disabled={page === 0}
                    onClick={() => onPageChange((prev) => prev - 1)}
                    className=" flex text-center  items-center px-3 py-1 hover:shadow-md rounded-md disabled:opacity-50 gap-1"
                >
                    <RiArrowLeftDoubleLine size={25}/>

                    Prev
                </button>
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => onPageChange((prev) => prev + 1)}
                    className="flex text-center items-center px-3 py-1 hover:shadow-md gap-1 rounded-md disabled:opacity-50"
                >

                    Next
                    <RiArrowRightDoubleFill size={25}/>

                </button>
            </div>


        </>
    )
}

export default Pagination;