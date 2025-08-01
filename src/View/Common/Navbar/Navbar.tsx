import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../Assets/Images/Logo/BookTech.png";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      console.log("User role:", parsed.role);
      setUser(parsed);
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "md:backdrop-blur-md md:bg-white/20 bg-white text-black shadow-md"
          : "bg-transparent text-black"
      }`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-6 py-4 shadow-md shadow-[#f1a485]">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-20" />
        </div>
        <ul className="flex space-x-6 text-lg font-poppins">
          <li
            className={`cursor-pointer px-3 py-2 rounded transition-all ${
              location.pathname === "/"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "hover:bg-orange-400 hover:text-white"
            }`}
          >
            <Link to="/">Home</Link>
          </li>

          <li
            className={`cursor-pointer px-3 py-2 rounded transition-all ${
              location.pathname === "/about"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "hover:bg-orange-400 hover:text-white"
            }`}
          >
            <Link to="/about">About</Link>
          </li>

          <li
            className={`cursor-pointer px-3 py-2 rounded transition-all ${
              location.pathname === "/library"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "hover:bg-orange-400 hover:text-white"
            }`}
          >
            <Link to="/library">Library</Link>
          </li>

          <li
            className={`cursor-pointer px-3 py-2 rounded transition-all ${
              location.pathname === "/contact"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "hover:bg-orange-400 hover:text-white"
            }`}
          >
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="relative">
          {user ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={
                    user.profileImage ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-transform hover:scale-105"
                />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-xl overflow-hidden shadow-xl border border-gray-200 z-50">
                  <Link
                    to={
                      user?.role === "admin"
                        ? "/admin-dashboard"
                        : "/user-dashboard"
                    }
                    className="block px-6 py-4 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="ml-6 text-lg hover:underline font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center px-4 py-3 bg-white text-black shadow-md">
        <img src={Logo} alt="Logo" className="h-16" />
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-base">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/library" onClick={toggleMenu}>
            Library
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
          {user ? (
            <>
              <hr className="my-2" />
              <div className="flex items-center space-x-3">
                <img
                  src={
                    user?.profileImage
                      ? user.profileImage.startsWith("data:image")
                        ? user.profileImage
                        : `data:image/jpeg;base64,${user.profileImage}`
                      : `https://ui-avatars.com/api/?name=${
                          user?.name || "Guest"
                        }`
                  }
                  alt="Profile"
                  className="h-10 w-10 rounded-full border"
                />
                <span className="font-semibold">{user.name}</span>
              </div>
              <Link
                to={
                  user?.role === "admin"
                    ? "/admin-dashboard"
                    : "/user-dashboard"
                }
                className="mt-2"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-4 py-2 px-4 border rounded text-center hover:bg-gray-100 block"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
