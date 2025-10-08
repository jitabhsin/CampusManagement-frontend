import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, CheckCircle, MapPin, FileText, Bell, Settings, LogOut, Menu, X, User } from "lucide-react";
 
const StudentMenuGoodUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);

  const menuItems = [
    {
      title: "Items",
      icon: Package,
      items: [
        { name: "Lost Item Registration", href: "/LostSubmit", icon: MapPin },
        { name: "Found Item Submission", href: "/FoundSubmit", icon: CheckCircle },
        { name: "Lost Item Track", href: "/LostItemTrack", icon: FileText },
      ],
    },
    {
      title: "Reports",
      icon: FileText,
      items: [
        { name: "Found Item Report", href: "/FoundReport", icon: FileText },
        { name: "Lost Item Report", href: "/LostReport", icon: FileText },
      ],
    },
    {
      title: "Profile",  // New menu for student details
      icon: User,
      items: [
        { name: "Personal Details", href: "/Personal", icon: User },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Lost & Found</span>
            </div>

            <div className="hidden md:flex items-center ml-10 space-x-4">
              {menuItems.map((menuItem, idx) => (
                <div key={idx} className="relative">
                  <button
                    onClick={() => toggleDropdown(menuItem.title)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <menuItem.icon className="w-4 h-4 mr-2" />
                    {menuItem.title}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>

                  {openDropdown === menuItem.title && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200 py-2">
                      {menuItem.items.map((item, i) => (
                        <Link
                          key={i}
                          to={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <item.icon className="w-4 h-4 mr-3 text-gray-400" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {menuItems.map((menuItem, idx) => (
              <div key={idx}>
                <button
                  onClick={() => toggleDropdown(menuItem.title)}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <menuItem.icon className="w-5 h-5 mr-3" /> {menuItem.title}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === menuItem.title && (
                  <div className="ml-6 mt-2 space-y-1">
                    {menuItem.items.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                      >
                        <item.icon className="w-4 h-4 mr-3 text-gray-400" /> {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
            >
              <LogOut className="w-5 h-5 mr-3" /> Logout
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default StudentMenuGoodUI;
