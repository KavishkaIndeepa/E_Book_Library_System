import React, { useEffect } from "react";
import Main from "../../../Assets/Images/About/main.jpg";
import Sub from "../../../Assets/Images/About/sub.jpg";
import "./About.css";

export default function About() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-28 md:mt-16 mb-10">
      {/* Hero Section */}
      <div className="w-full bg-white h-auto lg:h-screen mt-8 md:mt-12 px-4 md:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={Main}
              alt="Bookshelf"
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
        {/* Right Section - Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About The Readit <br /> Books Store
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to our E-Book Library System — a digital platform where you
            can explore, read, and download a wide range of books. We offer two
            types of books: free and paid. Free books are available to all
            registered users, while paid books can be accessed after
            registration and a one-time purchase.
          </p>
          <p className="text-gray-600">
            Our goal is to make reading easy, affordable, and accessible for
            everyone. Whether you're looking for educational content or your
            next favorite story, our library is here to support your reading
            journey — anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Sub Section - Promo Banner */}
      <div className=" px-4 md:px-8">
        <div
          className="relative w-full h-[300px] md:h-[300px] rounded-lg overflow-hidden mt-12 flex items-center justify-center"
          style={{
            backgroundImage: `url(${Sub})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Promo Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-2xl">
            <h3 className="text-lg md:text-2xl font-medium mb-1 tracking-wide">
              Get 25% Off
            </h3>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              Discount On All Kinds of Bestselling Books
            </h2>
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300 shadow-md">
              Shop Now →
            </button>
          </div>
        </div>
      </div>

      {/* customer feedback */}
      <div className="mt-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-xl mx-auto">
          Discover why our readers love us! From our vast collection to seamless
          reading experience, hear directly from those who have explored our
          library.
        </p>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 w-max animate-scroll no-scrollbar"
            style={{
              animation: "scrollLeft 30s linear infinite",
            }}
          >
            {/* Original Cards + Duplicates */}
            {[...Array(2)]
              .flatMap(() => [
                {
                  img: "https://randomuser.me/api/portraits/women/44.jpg",
                  name: "Jane Doe",
                  role: "Book Reviewer",
                  feedback:
                    "The selection of books is amazing! I found everything I was looking for and more.",
                },
                {
                  img: "https://randomuser.me/api/portraits/men/32.jpg",
                  name: "John Smith",
                  role: "Educator",
                  feedback:
                    "A fantastic platform! The reading experience is smooth and the discounts are a great bonus.",
                },
                {
                  img: "https://randomuser.me/api/portraits/women/65.jpg",
                  name: "Emily Johnson",
                  role: "Author",
                  feedback:
                    "I love the variety of genres available. It's my go-to place for all my reading needs.",
                },
              ])
              .map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{item.feedback}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
