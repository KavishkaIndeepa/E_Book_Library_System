import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 md:px-12 lg:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4">E-Library</h2>
          <p className="text-gray-400">
            Explore thousands of digital books, journals, and more. Your gateway
            to unlimited knowledge, anywhere, anytime.
          </p>
        </div>

        {/* Quick Links */}
        {/* Quick Links */}
        <div className="flex flex-col items-start md:items-center">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-center">
            <li>
              <a href="#/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#/about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#/library" className="hover:text-white transition">
                Library
              </a>
            </li>
            <li>
              <a href="#/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <span>+94 77 9796 003</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>kavishka1104@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} E-book-Library. All rights reserved.
      </div>
    </footer>
  );
}
