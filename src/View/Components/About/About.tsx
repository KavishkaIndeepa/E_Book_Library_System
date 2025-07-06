import React from "react";
import Main from "../../../Assets/Images/About/main.jpg";

export default function About() {
  return (
    <div className="w-full bg-white h-auto lg:h-screen mt-8 md:mt-12  px-4 md:px-8 flex items-center mb-8 lg:mb-0 gap-10">
      {/* Left Section - Image with Play Button */}
      <div className="relative w-full md:w-1/2 max-w-md">
        <img
          src={Main}
          alt="Woman reading book"
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Right Section - Text */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          About The Readit <br /> Books Store
        </h2>
        <p className="text-gray-600 mb-4">
          Welcome to our E-Book Library System — a digital platform where you
          can explore, read, and download a wide range of books. We offer two
          types of books: free and paid. Free books are available to all
          registered users, while paid books can be accessed after registration
          and a one-time purchase.
        </p>
        <p className="text-gray-600 mb-4">
          Our goal is to make reading easy, affordable, and accessible for
          everyone. Whether you're looking for educational content or your next
          favorite story, our library is here to support your reading journey —
          anytime, anywhere.
        </p>
      </div>
    </div>
  );
}
