import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {visible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed bottom-6 right-6 
            bg-black 
            text-white p-3 rounded-full 
            shadow-lg transition-all 
            animate-fadeIn z-50
          "
        >
          <FaArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
