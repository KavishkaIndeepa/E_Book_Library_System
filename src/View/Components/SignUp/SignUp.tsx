import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BookIllustration from "../../../Assets/Images/Login/Login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      const res = await axios.post(
        "http://192.168.1.188:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: `+${phone}`,
          password: formData.password,
        }
      );

      Swal.fire("Success", "Registration Successful!", "success").then(() => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPhone("");
        navigate("/login");
      });
    } catch (err: any) {
      if (err.response && err.response.data?.msg) {
        Swal.fire("Error", err.response.data.msg, "error");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPhone("");
      } else {
        Swal.fire("Error", "Server Error. Please try again later.", "error");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPhone("");
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

      {/* Sign Up Card */}
      <div className="relative z-10 mt-5 mb-5 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl max-w-lg w-full px-8 py-10">
        <h2 className="text-3xl font-semibold text-white text-center mb-8 tracking-wide">
          Create Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white/20 border ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-white/30 focus:ring-[#571f09]"
              } text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2`}
              required
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white/20 border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-white/30 focus:ring-[#571f09]"
              } text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2`}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Phone Number
            </label>
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
                color: "#fff",
              }}
              buttonStyle={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
              }}
              dropdownStyle={{
                color: "#000",
              }}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/20 border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-[#571f09]"
                } text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 pr-10`}
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
            <label className="block text-sm font-medium text-white mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/20 border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-[#571f09]"
                } text-white rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 pr-10`}
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
