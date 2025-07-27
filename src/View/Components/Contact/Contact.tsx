import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import contactImage from "../../../Assets/Images/Contact/contact.png";

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
  };

  return (
    <div className="mt-28 mb-10 font-sans bg-white text-black">
      {/* Hero Section - Unchanged */}
      <div
        className="relative h-[320px] md:h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.pinimg.com/1200x/96/9a/4e/969a4e19dc632d9e7dbbaa2f7b301673.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <motion.div
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl md:text-2xl font-medium mb-2 tracking-wide">
            We're Here to Help
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Contact Our Library Support Team
          </h2>
          <p className="text-md md:text-lg font-light">
            Got a question or suggestion? Drop us a message and we’ll get back
            to you soon.
          </p>
        </motion.div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-20 items-start bg-[#fefdfc] rounded-2xl shadow-sm mt-10">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full shadow-lg px-4 py-4 bg-white rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
          {["name", "email", "subject"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a5c45] bg-[#faf8f7] transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a5c45] bg-[#faf8f7] transition"
            />
          </div>

          <button
            type="submit"
            className="bg-[#7a5c45] hover:bg-[#5c4332] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div
          className="relative flex flex-col justify-center gap-10 bg-no-repeat bg-right-bottom bg-contain mt-5 "
          // style={{
          //   backgroundImage: `url(${contactImage})`,
          //   backgroundPosition: "right bottom",
          //   backgroundSize: "contain",
          //   backgroundRepeat: "no-repeat",
          //   padding: "2rem",
          // }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-2">Get In Touch</h3>
            <p className="text-gray-600">
              Our team is always here to help. Whether it's a support request or
              feedback, we’d love to hear you.
            </p>
          </div>

          <div className="space-y-4 text-gray-700">
            {[
              { icon: faPhone, title: "Call Us", value: "+128 2367 1246" },
              {
                icon: faEnvelope,
                title: "Email Us",
                value: "help@awesomesite.com",
              },
              { icon: faGlobe, title: "Website", value: "www.awesomesite.com" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-[#7a5c45] text-xl mt-1"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="font-semibold mb-3">Follow Us</p>
            <div className="flex gap-5 text-2xl text-gray-600">
              <a href="#" className="hover:text-[#3b5998] transition">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="hover:text-[#1da1f2] transition">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-[#e1306c] transition">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="hover:text-[#0077b5] transition">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
