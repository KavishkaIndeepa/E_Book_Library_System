import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaBars,
  FaSignOutAlt,
  FaUsers,
  FaBook,
} from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin-dashboard" },
    { label: "Members", icon: <FaUsers />, path: "/admin-dashboard/members" },
    { label: "Books", icon: <FaBook />, path: "/admin-dashboard/books" },
    { path: "/admin-dashboard/books/add-books" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-['Quicksand']">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 bg-[#0f0e47] text-white ${
          collapsed ? "w-16" : "w-64"
        } min-h-screen shadow-xl flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          {!collapsed && (
            <h1 className="text-2xl font-bold tracking-wide">Admin</h1>
          )}
          <FaBars
            className="cursor-pointer text-xl hover:scale-110 transition"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-700">
          <img
            src={
              user?.profileImage
                ? user.profileImage.startsWith("data:image")
                  ? user.profileImage
                  : `data:image/jpeg;base64,${user.profileImage}`
                : `https://ui-avatars.com/api/?name=${
                    user?.name || "Guest"
                  }&background=random`
            }
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover"
          />
          {!collapsed && (
            <div>
              <p className="text-lg text-gray-300">Welcome,</p>
              <p className="text-sm font-semibold">{user?.name || "Guest"}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 px-2 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center w-full text-left text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-[#4a2b1c] transition-all duration-200 group"
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="ml-4 group-hover:text-orange-300">
                  {item.label}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left text-sm font-medium py-2.5 px-3 mt-6 rounded-lg hover:bg-red-600 transition-all duration-200 group"
          >
            <FaSignOutAlt className="text-lg" />
            {!collapsed && (
              <span className="ml-4 group-hover:text-white">Logout</span>
            )}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-inner rounded-tl-3xl">
        <Outlet />
      </div>
    </div>
  );
}
