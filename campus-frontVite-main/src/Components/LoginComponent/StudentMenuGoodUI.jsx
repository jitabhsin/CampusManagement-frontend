import React, { useState } from "react";
import {
  ChevronDown,
  Package,
  User,
  Search,
  FileText,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  Home,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

const StudentMenuGoodUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const menuItems = [
    {
      title: "Items",
      icon: Package,
      items: [
        { name: "Lost Item Registration", href: "", icon: MapPin },
        { name: "Found Item Submission", href: "", icon: CheckCircle },
        { name: "Lost Item Track", href: "", icon: Search },
      ],
    },
    {
      title: "Student",
      icon: User,
      items: [
        { name: "Student List", href: "", icon: User },
        { name: "Remove Student", href: "", icon: User },
      ],
    },
    {
      title: "Lost-Item",
      icon: Search,
      items: [
        { name: "Lost Item Registration", href: "", icon: MapPin },
        { name: "Lost Item List", href: "", icon: FileText },
        { name: "Lost Item Track", href: "", icon: Search },
      ],
    },
    {
      title: "Found-Item",
      icon: Package,
      items: [
        { name: "Found Item Submission", href: "", icon: CheckCircle },
        { name: "Found Item List", href: "", icon: FileText },
      ],
    },
    {
      title: "Report",
      icon: FileText,
      items: [
        { name: "Found Item Report", href: "", icon: FileText },
        { name: "Lost Item Report", href: "", icon: FileText },
        { name: "Lost Found Analysis", href: "", icon: FileText },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">
                  Lost & Found
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((menuItem, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => toggleDropdown(menuItem.title)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <menuItem.icon className="w-4 h-4 mr-2" />
                      {menuItem.title}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === menuItem.title && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200 py-2">
                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                          <span className="text-sm font-semibold text-gray-800">
                            {menuItem.title}
                          </span>
                        </div>
                        {menuItem.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <item.icon className="w-4 h-4 mr-3 text-gray-400" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side actions */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Settings className="h-6 w-6" />
                </button>
                <a
                  href="/"
                  className="ml-3 flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {menuItems.map((menuItem, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleDropdown(menuItem.title)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <menuItem.icon className="w-5 h-5 mr-3" />
                      {menuItem.title}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Mobile Dropdown */}
                  {openDropdown === menuItem.title && (
                    <div className="ml-6 mt-2 space-y-1">
                      {menuItem.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href}
                          className="flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <item.icon className="w-4 h-4 mr-3 text-gray-400" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Logout */}
              <a
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Home className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Welcome to Student Portal
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Lost & Found Management System
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Search className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Lost Items
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">12</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Found Items
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">8</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">4</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Reports
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">3</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Activity
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your latest lost and found activities
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Search className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Lost Item Reported
                      </p>
                      <p className="text-sm text-gray-500">
                        iPhone 13 Pro - 2 hours ago
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Lost
                  </span>
                </div>
              </li>
              <li className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Found Item Submitted
                      </p>
                      <p className="text-sm text-gray-500">
                        Black Backpack - 1 day ago
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Found
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMenuGoodUI;
