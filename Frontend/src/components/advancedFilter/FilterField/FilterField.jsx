import React from "react";

const FilterField = ({ label, icon, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="text-sm flex items-center gap-2 font-medium text-gray-700 mb-1">
        {icon} {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-b p-1 text-[15px] outline-none"
      />
    </div>
  );
};

export default FilterField;
