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
  };

  return (
    <div className="mt-28 md:mt-24 mb-10 font-sans bg-white text-black">
      {/* Hero Section */}
      <div
        className="relative h-[320px] md:h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Hero})` }}
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
            Got a question or suggestion? Drop us a message and we’ll get back to you soon.
          </p>
        </motion.div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:flex md:gap-12">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 h-full bg-white/80 shadow-xl backdrop-blur-xl rounded-3xl p-8 md:p-10 space-y-6 border border-[#e0e0e0]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#954c2e] mb-6">
            Send Us a Message
          </h3>

          {["name", "email", "subject"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#954c2e] bg-white transition"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Your Message</label>
            <textarea
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#954c2e] bg-white transition"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full bg-[#954c2e] hover:bg-[#421f11] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            SEND MESSAGE
          </motion.button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          className="flex-1 h-full px-4 space-y-10"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-[#954c2e] font-semibold">Contact Us</h3>
            <h2 className="text-3xl font-bold mt-1 mb-3">Get In Touch</h2>
            <p className="text-gray-600">
              Our team is always here to help. Whether it's support or feedback, we'd love to hear from you.
            </p>
          </div>

          <div className="space-y-5">
            {[
              { icon: faPhone, title: "Call Us", value: "+123-236-7124" },
              { icon: faEnvelope, title: "Email Us", value: "help@awesomeSite.com" },
              { icon: faGlobe, title: "Website", value: "www.awesomeSite.com" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <FontAwesomeIcon icon={item.icon} className="text-[#954c2e] text-xl mt-1" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="font-semibold mb-3">Follow Us On</p>
            <div className="flex gap-5 text-2xl">
              <a href="#" className="text-[#3352ff] hover:text-[#1e3cb8] transition">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-[#1da1f2] hover:text-[#0a85d1] transition">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-[#e1306c] hover:text-[#b22153] transition">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-[#0077b5] hover:text-[#005c90] transition">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
