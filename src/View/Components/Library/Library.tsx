import React, { useEffect, useState } from "react";
import Hero from "../../../Assets/Images/Library/library.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const categories = [
  "Arts & Photography",
  "Biographies & Memoirs",
  "Christian Books & Bibles",
  "Research & Publishing Guides",
  "Sports & Outdoors",
  "Food & Drink",
];

export const books = [
  {
    id: 1,
    title: "Simple Things You Save BOOK",
    image:
      "https://i.pinimg.com/736x/0a/6c/89/0a6c89e4de84e74745c22a0d656e6e2d.jpg",
    price: "$120.00",
    categories: "Arts & Photography",
    discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
    meta: {
      sku: "FTC1000B65D",
      tags: "Design Low Book",
      category: "Arts & Photography",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 2,
    title: "How Deal With Very Bad BOOK",
    image:
      "https://i.pinimg.com/736x/65/97/fa/6597fad2d2118ce25b3b2d2acb39a551.jpg",
    price: "$40.00",
    categories: "Biographies & Memoirs",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1010B65D",
      tags: "Design Low Book",
      category: "Biographies & Memoirs",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 3,
    title: "Castle In The Sky",
    image:
      "https://i.pinimg.com/736x/47/3d/de/473dde63b19f2febc9ef6c6ab24969c7.jpg",
    price: "Free",
    categories: "Christian Books & Bibles",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1020B65D",
      tags: "Design Low Book",
      category: "Christian Books & Bibles",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 4,
    title: "The Hidden Mystery Behind",
    image:
      "https://i.pinimg.com/736x/a0/50/40/a050401a6437cba929b52f0d5eb1438e.jpg",
    price: "Free",
    categories: "Research & Publishing Guides",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1040B65D",
      tags: "Design Low Book",
      category: "Research & Publishing Guides",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 5,
    title: "Flovely and Unicom Erna",
    image:
      "https://i.pinimg.com/736x/f1/d5/30/f1d53025b4393715e43d14d3c12f481b.jpg",
    price: "Free",
    categories: "Sports & Outdoors",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
      meta: {
        sku: "FTC1050B65D",
        tags: "Design Low Book",
        category: "Sports & Outdoors",
        format: "Hardcover",
        pages: 330,
        publishYear: 2021,
        language: "English",
        century: "United States",
        availability: "In Stock",
      }
  },
  {
    id: 6,
    title: "Simple Things You Save BOOK",
    image:
      "https://i.pinimg.com/736x/73/46/8c/73468c412d2509c536f6a36184de75cb.jpg",
    price: "$20.00",
    categories: "Food & Drink",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1060B65D",
      tags: "Design Low Book",
      category: "Food & Drink",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 7,
    title: "The Hidden Mystery Behind",
    image:
      "https://i.pinimg.com/736x/95/6f/9d/956f9dd0e5d0ec87344541547af64808.jpg",
    price: "Free",
    categories: "Arts & Photography",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1070B65D",
      tags: "Design Low Book",
      category: "Arts & Photography",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 8,
    title: "How Deal With Very Bad BOOK",
    image:
      "https://i.pinimg.com/736x/5f/2c/56/5f2c56542421aeff4e87ab05d612fefe.jpg",
    price: "$60.00",
    categories: "Biographies & Memoirs",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1080B65D",
      tags: "Design Low Book",
      category: "Biographies & Memoirs",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 9,
    title: "How Deal With Very Bad BOOK",
    image:
      "https://i.pinimg.com/736x/18/5e/9f/185e9f46b45d90f2301f1573aa3aa8d4.jpg",
    price: "$50.00",
    categories: "Christian Books & Bibles",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1090B65D",
      tags: "Design Low Book",
      category: "Christian Books & Bibles",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 10,
    title: "How Deal With Very Bad BOOK",
    image:
      "https://i.pinimg.com/736x/82/86/32/8286321c9e9864c0299b16f106fdf47f.jpg",
    price: "Free",
    categories: "Research & Publishing Guides",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1100B65D",
      tags: "Design Low Book",
      category: "Research & Publishing Guides",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 11,
    title: "How Deal With Very Bad BOOK",
    image:
      "https://i.pinimg.com/736x/82/86/32/8286321c9e9864c0299b16f106fdf47f.jpg",
    price: "Free",
    categories: "Sports & Outdoors",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1110B65D",
      tags: "Design Low Book",
      category: "Sports & Outdoors",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
  {
    id: 12,
    title: "You Are My Sunshine",
    image:
      "https://i.pinimg.com/736x/82/86/32/8286321c9e9864c0299b16f106fdf47f.jpg",
    price: "$60.00",
    categories: "Food & Drink",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis pretium...",
     meta: {
      sku: "FTC1120B65D",
      tags: "Design Low Book",
      category: "Food & Drink",
      format: "Hardcover",
      pages: 330,
      publishYear: 2021,
      language: "English",
      century: "United States",
      availability: "In Stock",
    },
  },
];

export default function Library() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOnly, setShowOnly] = useState("all");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("book-grid");
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const booksPerPage = 9;

  const filteredBooks = books.filter((book: any) => {
    const priceNum = parseFloat(book.price.replace("$", "")) || 0;
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrice = book.price === "Free" || priceNum <= priceFilter;
    const matchesCategory = selectedCategory
      ? book.categories.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesType =
      showOnly === "free"
        ? book.price.toLowerCase() === "free"
        : showOnly === "paid"
        ? book.price.toLowerCase() !== "free"
        : true;

    return matchesSearch && matchesPrice && matchesCategory && matchesType;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  return (
    <div className="mt-28 md:mt-24 mb-10 font-sans bg-white text-black">
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-12 flex items-center justify-center"
        style={{
          backgroundImage: `url(${Hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h3 className="text-lg md:text-2xl font-medium mb-1 tracking-wide">
            Unlock the Power of Reading
          </h3>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
            Explore, Read & Own Your Favourite Books Today
          </h2>
          <p className="text-sm md:text-lg font-light max-w-xl mx-auto">
            Discover a wide range of bestselling books and enjoy exclusive
            discounts. Whether you love fiction, non-fiction, or academic reads
            — there’s something here for everyone.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-14 px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 w-full space-y-6">
            {/* Search */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-2">Search</h3>
              <div className="mt-2 flex items-center bg-white border rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 outline-none text-black"
                />
                <button className="p-2 bg-primary text-white">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>

            {/* Filter by Free/Paid */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-2">
                Free / Paid
              </h3>
              <div className="mt-2 space-y-2">
                {["all", "free", "paid"].map((type) => (
                  <label
                    key={type}
                    className={`block cursor-pointer p-2 rounded-md ${
                      showOnly === type
                        ? "bg-gray-800 text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={showOnly === type}
                      onChange={() => {
                        setShowOnly(type);
                        setPage(1);
                      }}
                      className="mr-2"
                    />
                    {type === "all"
                      ? "All Books"
                      : type === "free"
                      ? "Free Books"
                      : "Paid Books"}
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-2">
                Categories
              </h3>
              <div className="space-y-2 mt-2">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory((prev) =>
                        prev === cat ? null : cat
                      );
                      setPage(1);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md border ${
                      selectedCategory === cat
                        ? "bg-gray-800 text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPage(1);
                  }}
                  className="w-full text-left text-sm text-blue-500 hover:underline mt-2"
                >
                  Clear Filter
                </button>
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-2">Max Price</h3>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceFilter}
                  onChange={(e) => {
                    setPriceFilter(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">
                  Up to ${priceFilter}
                </div>
              </div>
            </div>
          </div>

          {/* Book Grid */}
          <div className="lg:w-3/4 w-full">
            <div
              id="book-grid"
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((book: any) => (
                  <div
                    onClick={() => navigate(`/book/${book.id}`)}
                    key={book.id}
                    className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 relative group h-[360px] flex flex-col justify-between"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-52 object-cover rounded"
                    />
                    <h4 className="mt-3 text-md font-semibold text-black">
                      {book.title}
                    </h4>
                    <div className="text-sm text-gray-600">
                      <span className="text-black font-medium">
                        {book.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button className="bg-black px-4 py-1 rounded-full text-sm text-white transform transition-transform hover:scale-105 hover:bg-gray-800 shadow-sm">
                        Add To Cart
                      </button>

                      <div className="flex gap-2">
                        <button title="View">
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-gray-600 hover:text-black"
                          />
                        </button>
                        <button title="Add to Favourites">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="text-gray-600 hover:text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  No books found for your filter.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm ${
                    page === i + 1
                      ? "bg-primary text-black"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
