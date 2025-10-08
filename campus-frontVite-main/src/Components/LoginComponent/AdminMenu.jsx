import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllStudents } from "../../Services/LoginService";
import { getAllLostItems, getAllFoundItems } from "../../Services/ItemService";

const AdminMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLost: 0,
    totalFound: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse, lostResponse, foundResponse] = await Promise.all([
          getAllStudents(),
          getAllLostItems(),
          getAllFoundItems(),
        ]);
        setStats({
          totalUsers: usersResponse.data.length,
          totalLost: lostResponse.data.length,
          totalFound: foundResponse.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  const toggleDropdown = (name) =>
    setOpenDropdown(openDropdown === name ? null : name);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex space-x-4">
            {["Report", "Student"].map((menu) => (
              <div key={menu} className="relative">
                <button
                  onClick={() => toggleDropdown(menu.toLowerCase())}
                  className="flex items-center px-3 py-2 text-black font-semibold hover:bg-yellow-500 rounded transition"
                >
                  {menu} ▼
                </button>
                {openDropdown === menu.toLowerCase() && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded shadow-lg border border-gray-200 z-50">
                    <div className="py-2 flex flex-col">
                      {menu === "Report" && (
                        <>
                          <Link to="/LostReport" className="block px-4 py-2 hover:bg-gray-100">Lost Item Report</Link>
                          <Link to="/FoundReport" className="block px-4 py-2 hover:bg-gray-100">Found Item Report</Link>
                        </>
                      )}
                      {menu === "Student" && (
                        <Link to="/DeleteStudentList" className="block px-4 py-2 hover:bg-gray-100">View Student List</Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link to="/" className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600 rounded transition">
            Logout
          </Link>
        </div>
      </nav>

      <header className="text-center mt-10">
        <h1 className="text-5xl font-bold text-green-600 underline italic">
          Lost & Found Admin Menu
        </h1>
      </header>

      <section className="max-w-6xl mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center">
            <span className="text-5xl mb-3">👥</span>
            <p className="text-lg font-medium text-gray-700 text-center">Total Users</p>
            <p className="text-4xl font-bold text-blue-600 text-center">{stats.totalUsers}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center">
            <span className="text-5xl mb-3">❌</span>
            <p className="text-lg font-medium text-gray-700 text-center">Lost Submissions</p>
            <p className="text-4xl font-bold text-red-600 text-center">{stats.totalLost}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center">
            <span className="text-5xl mb-3">✅</span>
            <p className="text-lg font-medium text-gray-700 text-center">Found Submissions</p>
            <p className="text-4xl font-bold text-green-600 text-center">{stats.totalFound}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminMenu;