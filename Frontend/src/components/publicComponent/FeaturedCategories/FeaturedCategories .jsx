import React from "react";
import { FaLaptopCode, FaPaintBrush, FaChartLine, FaCog, FaBriefcase, FaBullhorn, FaUsers, FaDatabase } from "react-icons/fa";

const categories = [
  { id: 1, name: "IT & Software", icon: <FaLaptopCode />, jobs: "120+" },
  { id: 2, name: "Design & Creative", icon: <FaPaintBrush />, jobs: "80+" },
  { id: 3, name: "Marketing", icon: <FaBullhorn />, jobs: "60+" },
  { id: 4, name: "Human Resources", icon: <FaUsers />, jobs: "45+" },
  { id: 5, name: "Finance", icon: <FaChartLine />, jobs: "50+" },
  { id: 6, name: "Engineering", icon: <FaCog />, jobs: "70+" },
  { id: 7, name: "Business Development", icon: <FaBriefcase />, jobs: "40+" },
  { id: 8, name: "Database / SQL", icon: <FaDatabase />, jobs: "30+" },
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🌟 Featured Job Categories
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore the top hiring categories and find your perfect match.  
          Opportunities waiting for every skill set and passion!
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white hover:bg-blue-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl text-blue-600 mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-gray-800 text-lg">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.jobs} Jobs</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
