import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookIllustration from "../../../Assets/Images/Login/Login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      const data = res.data as { user: any };
      localStorage.setItem("user", JSON.stringify(data.user));

      Swal.fire("Success", "Login Successful!", "success").then(() => {
        setEmail("");
        setPassword("");
        navigate("/");
      });
    } catch (err: any) {
      if (err.response && err.response.data?.msg) {
        Swal.fire("Error", err.response.data.msg, "error");
         setEmail("");
        setPassword("");
      } else {
        Swal.fire("Error", "Server error. Please try again later.", "error");
         setEmail("");
        setPassword("");
      }
    }
  };

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
          <Link
            to="/"
            className="flex items-center text-white/80 text-sm hover:underline"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <h2 className="text-3xl font-semibold text-white text-center mb-8 tracking-wide">
          Login to Your Library
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 bg-white/20 border ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-white/30 focus:ring-[#571f09]"
              } text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2`}
              aria-label="Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 bg-white/20 border ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-[#571f09]"
                } text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 pr-10`}
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
