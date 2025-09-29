// C:\Users\ASUS\Documents\Infosysproject2025\campus-frontVite-main\src\Components\LoginComponent\StudentMenuMid.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const StudentMenuMid = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const menuItems = {
    "lost-item": {
      title: "Lost Item",
      links: [
        { name: "Report a Lost Item", path: "/lost-item" },
        { name: "View Lost Item Report", path: "/lost-item-report" },
      ],
    },
    "found-item": {
      title: "Found Item",
      links: [
        { name: "Submit a Found Item", path: "/found-item" },
        { name: "View Found Item Report", path: "/found-item-report" },
      ],
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="text-center bg-pink-200 py-4 shadow-md">
        <h1 className="text-4xl font-bold text-pink-600 underline italic">
          Lost & Found Student Menu
        </h1>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-yellow-400 py-2 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-center space-x-6">
          {Object.keys(menuItems).map((key) => (
            <div className="relative" key={key}>
              <button
                onClick={() => toggleDropdown(key)}
                className="flex items-center px-4 py-2 text-black font-bold hover:bg-yellow-500 rounded-md transition-colors"
              >
                {menuItems[key].title}
                <ChevronDown className="w-5 h-5 ml-1" />
              </button>
              {openDropdown === key && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-xl z-50 border border-gray-200">
                  <div className="py-2">
                    {menuItems[key].links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link
            to="/"
            className="px-4 py-2 text-white font-bold bg-red-500 hover:bg-red-600 rounded-md transition-colors"
          >
            <b>Logout</b>
          </Link>
        </div>
      </nav>
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Welcome to the Portal!</h2>
        <p className="text-gray-500 mt-2">Please use the menu above to report or view items.</p>
      </div>
    </div>
  );
};

export default StudentMenuMid;