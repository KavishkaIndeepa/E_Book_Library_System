import React, { useEffect, useState } from "react";
import {
  faTachometerAlt,
  faBars,
  faSignOutAlt,
  faUsers,
  faBook,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: "Dashboard", icon: faTachometerAlt, path: "/admin-dashboard" },
    { label: "Members", icon: faUsers, path: "/admin-dashboard/members" },
    { label: "Books", icon: faBook, path: "/admin-dashboard/books" },
    { path: "/admin-dashboard/books/add-books" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-['poppins']">
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
          <FontAwesomeIcon
            icon={faBars}
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
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full text-left text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-300 group
        ${
          isActive
            ? "bg-white/10 backdrop-blur-sm border-l-4 border-indigo-400 text-indigo-300 shadow-md"
            : "hover:bg-white/10 hover:backdrop-blur-sm hover:ring-1 hover:ring-indigo-300 text-white"
        }`}
              >
                <FontAwesomeIcon
                  icon={item.icon as IconDefinition}
                  className={`text-base transition duration-200 ${
                    isActive
                      ? "text-indigo-300"
                      : "group-hover:text-indigo-200 text-white"
                  }`}
                />
                {!collapsed && (
                  <span
                    className={`ml-4 transition duration-200 ${
                      isActive
                        ? "text-indigo-300 font-semibold"
                        : "group-hover:text-indigo-200"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left text-sm font-medium py-2.5 px-3 mt-6 rounded-lg hover:bg-red-600 transition-all duration-200 group"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-base" />
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
