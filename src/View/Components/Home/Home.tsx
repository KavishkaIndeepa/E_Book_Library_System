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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
//@ts-ignore
import AOS from "aos";


export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  useEffect(() => {
    fetchBooks();
    window.scrollTo({ top: 0, behavior: "smooth" });
      AOS.init({ duration: 1000, easing: "ease-in-out",});
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ books: any[] }>(
        "http://192.168.1.188:5000/api/books?page=1&limit=12"
      );
      const { books: fetchedBooks } = res.data;
      const freeBooks = fetchedBooks.filter(
        (book: any) => book.price === "Free"
      );
      setBooks(freeBooks);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < books.length - itemsPerPage ? prev + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [books]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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

  const navigate = useNavigate();

  return (
    <motion.div
      className="mt-28 md:mt-12 mb-10 font-sans bg-white text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div
        className="w-full h-auto lg:h-screen mt-8 md:mt-12 px-4 md:px-8 flex items-center mb-8 lg:mb-0"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-6xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 p-6 mt-8 lg:mt-0 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              There Is No Friend As Loyal As A Book
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              Explore a world of knowledge, stories, and imagination. Access
              thousands of e-books right at your fingertips.
            </p>
            <button
              className="browse-btn relative overflow-hidden text-[#954c2e] px-6 py-3 rounded-lg font-semibold w-fit border-2 border-[#954c2e] group"
              onClick={() => navigate("/library")}
            >
              <span className="relative z-10 transition-colors duration-300">
                Browse Library
              </span>
            </button>
          </div>
          <motion.div
            className="w-full md:w-1/2 flex justify-end items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={'https://i.pinimg.com/736x/8d/e4/bf/8de4bf13fdc73361b7b93b4519b52ea7.jpg'}
              alt="Bookshelf"
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Achievements */}
      <div className="w-full py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl font-semibold text-[#333] inline-block">
              What you'll achieve by this book
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-2" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2" data-aos="fade-up">
              <img
                src={'https://i.pinimg.com/736x/d8/b4/95/d8b4955e1ff5cac6769c8a6f2dc4a096.jpg'}
                alt="Reading"
                className="rounded-xl w-full max-h-[400px] shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
            <div
              className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
              data-aos="zoom-in"
            >
              {[
                {
                  title: "Experience",
                  desc: "Learn and evolve with stories...",
                },
                { title: "Motivation", desc: "Discover ideas that inspire..." },
                { title: "Goals", desc: "Set and achieve new milestones..." },
                { title: "Vision", desc: "Shape your outlook on life..." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md shadow-[#954c2e] hover:shadow-[#954c2e] transition"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="w-full py-4 px-4 md:px-8 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl font-semibold inline-block text-[#333]">
              Chapters We've Covered
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-2" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2" data-aos="fade-up">
              <img
                src={'https://i.pinimg.com/736x/24/3b/f1/243bf115171417174b0a9f1bf6ca653f.jpg'}
                alt="Book cover"
                className="rounded-xl w-full max-h-[500px] shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4" data-aos="zoom-in">
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
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl font-semibold text-[#333] inline-block">
              Read Some Books Free
            </h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mt-2" />
          </div>

          {/* Carousel */}
          <div className="relative">
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

            <div className="overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                >
                  {books.map((book) => (
                    <div
                      key={book._id}
                      onClick={() => navigate(`/book/${book._id}`)}
                      className="min-w-[50%] sm:min-w-[33.33%] md:min-w-[25%] px-3 cursor-pointer"
                    >
                      <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                        {book.image ? (
                          <img
                            src={
                              book.image.startsWith("data:image")
                                ? book.image
                                : `data:image/jpeg;base64,${book.image}`
                            }
                            alt={book.title}
                            className="w-full h-64 object-cover rounded"
                          />
                        ) : (
                          <span className="text-xs text-gray-400 italic flex items-center justify-center h-64">
                            No Image
                          </span>
                        )}
                        <h3 className="text-center mt-2 font-medium text-sm text-[#954c2e]">
                          {book.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
