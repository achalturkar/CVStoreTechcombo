import React from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleFill } from "react-icons/ri";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5; 
    let start = Math.max(0, page - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons);

    if (end - start < maxButtons) start = Math.max(0, end - maxButtons);

    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 bg-white p-3 rounded-xl shadow-md mb-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 flex items-center gap-1"
      >
        <RiArrowLeftDoubleLine size={20} />
        Prev
      </button>

      {/* Number Buttons */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            num === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {num + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 flex items-center gap-1"
      >
        Next
        <RiArrowRightDoubleFill size={20} />
      </button>
    </div>
  );
};

export default Pagination;
