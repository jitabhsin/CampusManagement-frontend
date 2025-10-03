import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);

  return (
    <div className="mx-auto px-4">
      <div className="text-center bg-green-200 py-4">
        <h1 className="text-4xl font-bold text-green-500 underline italic">
          Lost Found Admin Menu
        </h1>
      </div>

      <nav className="bg-yellow-400 py-2">
        <div className="flex items-center justify-between px-4">

          {/* Items Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("items")}
              className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
            >
              Items <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {openDropdown === "items" && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                <div className="py-2">
                  <Link to="/LostSubmit" className="block px-4 py-2 hover:bg-gray-100">
                    Lost Item Registration
                  </Link>
                  <Link to="/Found-Submit" className="block px-4 py-2 hover:bg-gray-100">
                    Found Item Submission
                  </Link>
                  <Link to="/LostReport" className="block px-4 py-2 hover:bg-gray-100">
                    Lost Item Track
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Report Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("report")}
              className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
            >
              Report <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {openDropdown === "report" && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                <div className="py-2">
                  <Link to="/LostReport" className="block px-4 py-2 hover:bg-gray-100">
                    Lost Item Report
                  </Link>
                  <Link to="/FoundReport" className="block px-4 py-2 hover:bg-gray-100">
                    Found Item Report
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Users Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("users")}
              className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
            >
              Users <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {openDropdown === "users" && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                <div className="py-2">
                  <Link to="/Students" className="block px-4 py-2 hover:bg-gray-100">
                    View Students
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/"
            className="px-3 py-2 bg-red-500 text-white font-bold hover:bg-red-600 rounded"
          >
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminMenu;
