import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BookIllustration from "../../../Assets/Images/Login/Login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative px-4"
      style={{
        backgroundImage: `url(${BookIllustration})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Sign Up Card */}
      <div className="relative z-10 mt-5 mb-5 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl max-w-lg w-full px-8 py-10">
        <h2 className="text-3xl font-semibold text-white text-center mb-8 tracking-wide">
          Create Your Account
        </h2>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#571f09]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#571f09]"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Phone Number</label>
            <PhoneInput
              country={"lk"}
              value={phone}
              onChange={setPhone}
              inputStyle={{
                width: "100%",
                padding: "12px 12px 12px 45px",
                borderRadius: "0.5rem",
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#fff"
              }}
              buttonStyle={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none"
              }}
              dropdownStyle={{
                color: "#000"
              }}
              
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#571f09] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-white/80"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#571f09] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-white/80"
              >
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#954c2e] hover:bg-[#571f09] transition text-white py-2 rounded-xl font-semibold shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline font-medium">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
