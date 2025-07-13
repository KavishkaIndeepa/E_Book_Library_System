import React, { useEffect, useState } from "react";
import hero from "../../../Assets/Images/Home/hero.jpg";
import "../../../Assets/Css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const chapters = [
  {
    title: "Chapter 01",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur.",
  },
  {
    title: "Chapter 02",
    content: "Chapter 2 content goes here. This is some placeholder text.",
  },
  {
    title: "Chapter 03",
    content: "Chapter 3 content goes here. This is some placeholder text.",
  },
  {
    title: "Chapter 04",
    content: "Chapter 4 content goes here. This is some placeholder text.",
  },
];

const books = [
  {
    id: 1,
    title: "Book One",
    image:
      "https://i.pinimg.com/736x/0a/6c/89/0a6c89e4de84e74745c22a0d656e6e2d.jpg",
  },
  {
    id: 2,
    title: "Book Two",
    image:
      "https://i.pinimg.com/736x/65/97/fa/6597fad2d2118ce25b3b2d2acb39a551.jpg",
  },
  {
    id: 3,
    title: "Book Three",
    image:
      "https://i.pinimg.com/736x/47/3d/de/473dde63b19f2febc9ef6c6ab24969c7.jpg",
  },
  {
    id: 4,
    title: "Book Four",
    image:
      "https://i.pinimg.com/736x/a0/50/40/a050401a6437cba929b52f0d5eb1438e.jpg",
  },
  {
    id: 5,
    title: "Book Five",
    image:
      "https://i.pinimg.com/736x/f1/d5/30/f1d53025b4393715e43d14d3c12f481b.jpg",
  },
  {
    id: 6,
    title: "Book Six",
    image:
      "https://i.pinimg.com/736x/73/46/8c/73468c412d2509c536f6a36184de75cb.jpg",
  },
  {
    id: 7,
    title: "Book Seven",
    image:
      "https://i.pinimg.com/736x/95/6f/9d/956f9dd0e5d0ec87344541547af64808.jpg",
  },
  {
    id: 8,
    title: "Book Eight",
    image:
      "https://i.pinimg.com/736x/5f/2c/56/5f2c56542421aeff4e87ab05d612fefe.jpg",
  },
  {
    id: 9,
    title: "Book Nine",
    image:
      "https://i.pinimg.com/736x/18/5e/9f/185e9f46b45d90f2301f1573aa3aa8d4.jpg",
  },
  {
    id: 10,
    title: "Book Ten",
    image:
      "https://i.pinimg.com/736x/82/86/32/8286321c9e9864c0299b16f106fdf47f.jpg",
  },
  {
    id: 11,
    title: "Book Eleven",
    image:
      "https://i.pinimg.com/736x/a2/b9/45/a2b945931f5801d26e020477151cca6a.jpg",
  },
  {
    id: 12,
    title: "Book Twelve",
    image:
      "https://i.pinimg.com/736x/ac/c7/77/acc7779ef004fc043189532b27e6e5f9.jpg",
  },
];

export default function Home() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev < books.length - itemsPerPage ? prev + 1 : 0
    );
  }, 3000); // Auto-scroll every 3 seconds

  return () => clearInterval(interval);
}, []);

  const nextSlide = () => {
    if (currentIndex < books.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-28 md:mt-12 mb-10 font-sans bg-white text-black">
      <div className="w-full h-auto lg:h-screen mt-8 md:mt-12 px-4 md:px-8 flex items-center mb-8 lg:mb-0 ">
        {/* Main Container */}
        <div className="w-full max-w-6xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Section - Text */}
          <div className="w-full md:w-1/2 p-6 mt-8 lg:mt-0 md:p-12 flex flex-col justify-center text-Black">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              There Is No Friend As Loyal As A Book
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              Explore a world of knowledge, stories, and imagination. Access
              thousands of e-books right at your fingertips.
            </p>
            <button className="browse-btn relative overflow-hidden text-[#954c2e] px-6 py-3 rounded-lg font-semibold w-fit border-2 border-[#954c2e] group">
              <span className="relative z-10 transition-colors duration-300">
                Browse Library
              </span>
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={hero}
              alt="Bookshelf"
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="w-full py-4 px-4 md:px-8 ">
        <div className="max-w-6xl mx-auto">
          {/* Title with underline */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold inline-block text-[#333]">
              What you'll achieve by this book
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-2" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <img
                src={hero}
                alt="Reading"
                className="rounded-xl w-full shadow-lg"
              />
            </div>

            {/* Right side - Cards */}
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md shadow-[#954c2e] hover:shadow-[#954c2e] transition">
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <p className="text-sm text-gray-600">
                  Learn and evolve with stories that spark insight and
                  reflection.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md shadow-[#954c2e] hover:shadow-[#954c2e] transition">
                <h3 className="text-lg font-semibold mb-2">Motivation</h3>
                <p className="text-sm text-gray-600">
                  Discover ideas that inspire change and personal growth.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md shadow-[#954c2e] hover:shadow-[#954c2e] transition">
                <h3 className="text-lg font-semibold mb-2">Goals</h3>
                <p className="text-sm text-gray-600">
                  Set and achieve new milestones through guided knowledge.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md shadow-[#954c2e] hover:shadow-[#954c2e] transition">
                <h3 className="text-lg font-semibold mb-2">Vision</h3>
                <p className="text-sm text-gray-600">
                  Shape your outlook with a broader perspective on life and
                  ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="w-full py-4 px-4 md:px-8 bg-[#fdf6f3]">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold inline-block text-[#333]">
              Chapters We've Covered
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-2" />
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left - Image */}
            <div className="w-full md:w-1/2">
              <img
                src={hero}
                alt="Book cover"
                className="rounded-xl w-full shadow-lg"
              />
            </div>

            {/* Right - Accordion */}
            <div className="w-full md:w-1/2 space-y-4">
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-md shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none transition-colors duration-300 ${
                      activeIndex === index
                        ? "bg-[#954c2e] text-white"
                        : "bg-white text-[#954c2e]"
                    }`}
                  >
                    {chapter.title}
                    <FontAwesomeIcon
                      icon={activeIndex === index ? faAngleUp : faAngleDown}
                      style={{
                        color: activeIndex === index ? "white" : "#9d513f",
                      }}
                    />
                  </button>
                  {activeIndex === index && (
                    <div className="p-4 bg-orange-50 text-sm text-gray-700">
                      {chapter.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Free Books */}
      <div className="w-full py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold inline-block text-[#333]">
              Read Some Books Free
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-2" />
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-orange-100"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-orange-100"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Book Cards */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
              >
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="min-w-[50%] sm:min-w-[33.33%] md:min-w-[25%] px-3 cursor-pointer"
                  >
                    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-64 object-cover rounded"
                      />
                      <h3 className="text-center mt-2 font-medium text-sm text-[#954c2e]">
                        {book.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
