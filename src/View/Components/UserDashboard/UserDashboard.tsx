// UserDashboard.tsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBook,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaCreditCard,
} from "react-icons/fa";

export default function UserDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/user-dashboard" },
    { label: "Books", icon: <FaBook />, path: "/user-dashboard/books" },
    { label: "Profile", icon: <FaUser />, path: "/user-dashboard/profile" },
    { label: "Favourites", icon: <FaHeart />, path: "/user-dashboard/favourites" },
    { label: "Cart", icon: <FaShoppingCart />, path: "/user-dashboard/cart" },
    { label: "Payment", icon: <FaCreditCard />, path: "/user-dashboard/payment" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-['Quicksand']">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 bg-[#0f0e47] text-white ${
          collapsed ? "w-16" : "w-64"
        } min-h-screen shadow-xl flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          {!collapsed && <h1 className="text-2xl font-bold tracking-wide">Library</h1>}
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
                : `https://ui-avatars.com/api/?name=${user?.name || "Guest"}&background=random`
            }
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover"
          />
          {!collapsed && (
            <div className="ml-2">
              <p className="text-lg text-gray-300">Welcome,</p>
              <p className="text-sm font-semibold">{user?.name || "Guest"}</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="mt-4 flex-1 px-2 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center w-full text-left text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-[#4a2b1c] transition-all duration-200 group"
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="ml-4 group-hover:text-orange-300">{item.label}</span>
              )}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left text-sm font-medium py-2.5 px-3 mt-6 rounded-lg hover:bg-red-600 transition-all duration-200 group"
          >
            <FaSignOutAlt className="text-lg" />
            {!collapsed && <span className="ml-4 group-hover:text-white">Logout</span>}
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
