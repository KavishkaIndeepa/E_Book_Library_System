import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookIllustration from "../../../Assets/Images/Login/Login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative px-4"
      style={{
        backgroundImage: `url(${BookIllustration})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl max-w-md w-full px-8 py-10">
      {/* Back to Home Link */}
<div className="mb-4">
  <Link to="/" className="flex items-center text-white/80 text-sm hover:underline">
    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
    Back to Home
  </Link>
</div>

        <h2 className="text-3xl font-semibold text-white text-center mb-8 tracking-wide">
          Login to Your Library
        </h2>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#571f09]"
              aria-label="Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#571f09] pr-10"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-white/80"
                aria-label="Toggle password visibility"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-white hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#954c2e] hover:bg-[#571f09] transition text-white py-2 rounded-xl font-semibold shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-sm text-center mt-6 text-white/80">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white hover:underline font-medium">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
