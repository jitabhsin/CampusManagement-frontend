import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Package,
  CheckCircle,
  MapPin,
  FileText,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const StudentMenuGoodUI = () => {
  // State for desktop hover menus
  const [openDropdown, setOpenDropdown] = useState(null);
  const timeoutRef = useRef(null);

  // State for mobile click-to-open menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

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
      title: "Profile",
      icon: User,
      items: [{ name: "Personal Details", href: "/Personal", icon: User }],
    },
  ];

  // Handlers for desktop hover menus
  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  // Handler for mobile menu toggle
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handler for mobile dropdowns (click-based)
  const toggleMobileDropdown = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Package className="text-blue-600 w-6 h-6" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Lost & Found
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((menu) => {
              const isOpen = openDropdown === menu.title;
              return (
                <div
                  key={menu.title}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(menu.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center text-gray-700 font-medium text-base hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200">
                    <menu.icon className="w-5 h-5 mr-2" />
                    {menu.title}
                    <ChevronDown
                      className={`ml-1 w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transition-all ease-out duration-200 ${
                      isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      {menu.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center w-full px-4 py-2 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        >
                          <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sign Out & Mobile Menu Button */}
          <div className="flex items-center">
            <Link
              to="/"
              className="hidden md:flex items-center text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-2" /> Sign Out
            </Link>
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((menu) => (
                <div key={menu.title}>
                  <button
                    onClick={() => toggleMobileDropdown(menu.title)}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <menu.icon className="w-5 h-5 mr-3" />
                      {menu.title}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        mobileDropdown === menu.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileDropdown === menu.title && (
                    <div className="mt-2 pl-6 space-y-1">
                      {menu.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center w-full px-3 py-2 text-base text-gray-700 hover:bg-blue-50 rounded-md"
                        >
                          <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-100 my-2"></div>
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md"
              >
                <LogOut className="w-5 h-5 mr-3" /> Sign Out
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Centered Welcome Section */}
      <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-10">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Welcome, Student!
        </h1>
        <p className="text-gray-600 mt-4 text-center text-lg">
          Select an option from the navigation to get started.
        </p>
      </main>
    </div>
  );
};

export default StudentMenuGoodUI;
