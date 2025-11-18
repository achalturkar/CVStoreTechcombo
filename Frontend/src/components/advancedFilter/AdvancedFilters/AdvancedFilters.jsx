import React from "react";

import { MdLocationOn, MdSchool, MdWork, MdFilterAlt } from "react-icons/md";
import { FaBuilding, FaUserTie } from "react-icons/fa";
import FilterField from "../FilterField/FilterField";

const AdvancedFilters = ({ filters, setFilters, onApply }) => {
  return (
    <div className="mt-6 border bg-white shadow-sm p-5">
      
      <div className="flex items-center gap-2 text-gray-800 font-medium mb-5 text-[15px]">
        <MdFilterAlt size={18} />
        Advanced Filters
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <FilterField
          label="Location"
          icon={<MdLocationOn />}
          placeholder="Mumbai, Pune, Remote"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />

      <FilterField
  label="Experience (Years)"
  icon={<MdWork />}
  placeholder="3"
  value={filters.experience}
  type="number"
  min={0}
  max={50}
  step={1}
  onChange={(e) =>
    setFilters({ ...filters, experience: e.target.value })
  }
/>


        <FilterField
          label="Education"
          icon={<MdSchool />}
          placeholder="B.Tech, MCA, BSc"
          value={filters.education}
          onChange={(e) =>
            setFilters({ ...filters, education: e.target.value })
          }
        />

        <FilterField
          label="Company"
          icon={<FaBuilding />}
          placeholder="TCS, Infosys, Wipro"
          value={filters.company}
          onChange={(e) =>
            setFilters({ ...filters, company: e.target.value })
          }
        />

        <FilterField
          label="Designation"
          icon={<FaUserTie />}
          placeholder="Software Engineer, Team Lead"
          value={filters.designation}
          onChange={(e) =>
            setFilters({ ...filters, designation: e.target.value })
          }
        />

      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onApply}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 text-sm hover:bg-black transition"
        >
          <MdFilterAlt size={18} />
          Apply Filters
        </button>
      </div>

    </div>
  );
};

export default AdvancedFilters;
