import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//@ts-ignore
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../../Assets/Images/Logo/BookTech.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "md:backdrop-blur-md md:bg-white/20 bg-white text-black shadow-md"
          : "bg-transparent text-black"
      }`}
    >
      {/* Desktop view */}
      <div className="hidden md:flex justify-between items-center px-6 py-4 shadow-md shadow-[#f1a485]">
        {/* Left - Logo */}
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        {/* Middle - Nav Links */}
        <ul className="flex space-x-6 text-lg font-poppins">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right - Login */}
        <div>
          <Link
            to="/login"
            className="ml-6 text-lg hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet view */}
      <div className="flex md:hidden justify-between items-center px-4 py-3 bg-white text-black shadow-md">
        <img src={Logo} alt="Logo" className="h-16" />
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Slide-in Menu */}
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
          <Link to="/blog" onClick={toggleMenu}>
            Blog
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
        </nav>
        <div className="px-4 mt-6">
          <Link
            to="/login"
            className="py-2 px-4 border rounded text-center hover:bg-gray-100 block"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
