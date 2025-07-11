import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faGlobe,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import Hero from "../../../Assets/Images/Library/library.jpg";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add email or API integration here
  };

  return (
    <div className="mt-28 md:mt-36 font-sans bg-white text-black">
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-12 flex items-center justify-center"
        style={{
          backgroundImage: `url(${Hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h3 className="text-lg md:text-2xl font-medium mb-2 tracking-wide">
            We're Here to Help
          </h3>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
            Contact Our Library Support Team
          </h2>
          <p className="text-sm md:text-lg font-light max-w-xl mx-auto">
            Have questions or suggestions? Send us a message, and we’ll get back
            to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 md:px-16 pt-10 bg-white shadow-2xl rounded-2xl pb-5">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 w-full">
          <div>
            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full border border-gray-400 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full border border-gray-400 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full border border-gray-400 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Message"
              className="w-full border border-gray-400 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded transition duration-300"
          >
            SEND MESSAGE
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8 ">
          <div>
            <p className="text-yellow-600 font-semibold">Contact Us</p>
            <h2 className="text-3xl font-bold mt-1 mb-4">Get In Touch</h2>
            <p className="text-gray-600">
              Feel free to reach out for any queries or assistance. We're here
              to help you anytime.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-yellow-600 mt-1"
              />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-700">+123-236-7124</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-yellow-600 mt-1"
              />
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-700">help@awesomeSite.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-yellow-600 mt-1"
              />
              <div>
                <p className="font-semibold">Website</p>
                <p className="text-gray-700">www.awesomeSite.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-yellow-600 mt-1"
              />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-700">
                  99 Irving St, Big City, PNU 23456
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <p className="font-semibold mb-3">Follow Us On</p>
            <div className="flex gap-4">
              <a href="#" className="text-yellow-600 hover:text-yellow-800 ">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-yellow-600 hover:text-yellow-800">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-yellow-600 hover:text-yellow-800">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-yellow-600 hover:text-yellow-800">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <iframe
          title="Google Map"
          className="w-full h-[400px] rounded-xl shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.88226524745!2d-0.5103752668700173!3d51.28676018153788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876054d3a1b8c37%3A0xf5c58bbd31f0bb84!2sLondon%2C%20UK!5e0!3m2!1sen!2slk!4v1720501112345!5m2!1sen!2slk"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
