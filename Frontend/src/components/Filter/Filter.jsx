import React, { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

const Filter = () => {
  const { filter, setFilter } = useContext(SearchContext);

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>        

    <div className=" flex gap-4 p-4 bg-white rounded-xl shadow-md mt-4">

      {/* Experience Filter */}
      <div className="mb-3 ">
        <label className="block text-sm font-medium">Experience</label>
        <select
          name="experience"
          value={filter.experience}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        >
          <option value="">Any</option>
          {[...Array(21).keys()].map((num) => (
            <option key={num} value={num}>
              {num} 
            </option>
          ))}
        </select>
      </div>

      {/* Skills Filter */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Skills</label>
        <input
          type="text"
          name="skills"
          placeholder="e.g. React, Java"
          value={filter.skills}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Company Filter */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Company</label>
        <input
          type="text"
          name="company"
          placeholder="e.g. Google, TCS"
          value={filter.company}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Education Filter */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Education</label>
        <input
          type="text"
          name="education"
          placeholder="e.g. B.Tech, MBA"
          value={filter.education}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>
    </div>
    </>
 
  );
};

export default Filter;
