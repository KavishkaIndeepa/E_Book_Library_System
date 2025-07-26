import React, { useEffect, useState } from "react";
import Hero from "../../../Assets/Images/Library/library.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import Swal from "sweetalert2";

export default function Library() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOnly, setShowOnly] = useState("all");
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const booksPerPage = 9;

  useEffect(() => {
    fetchBooks();
    fetchWishlist();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ books: any[]; total: number }>(
        `http://192.168.1.188:5000/api/books?page=${page}&limit=${booksPerPage}`
      );
      const { books, total } = res.data;
      setBooks(books);
      setTotalBooks(total);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const categories = Array.from(new Set(books.map((book) => book.category)));

  const filteredBooks = books.filter((book: any) => {
    const priceStr = book.price?.toLowerCase();
    const isFree = priceStr === "free";
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? book.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesType =
      showOnly === "free" ? isFree : showOnly === "paid" ? !isFree : true;

    return matchesSearch && matchesCategory && matchesType;
  });

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  //add to cart
  const handleAddToCart = async (book: any) => {
    // Get user from localStorage
    let user = null;
    const userString = localStorage.getItem("user");
    try {
      user = userString ? JSON.parse(userString) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
    }

    // Get token from user object or fallback to 'token' key
    const token = user?.token || localStorage.getItem("token");

    // Show warning if user or token is missing
    if (!user || !token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to add books to your cart.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      // Send request to backend to add item to cart
      await axios.post(
        "http://192.168.1.188:5000/api/cart/add",
        {
          bookId: book._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "You successfully added the book to the cart. You can check your cart items on your dashboard.",
        confirmButtonColor: "#3085d6",
      });
    } catch (err: any) {
      // Show error alert with message from backend or generic fallback
      console.error("Add to cart failed", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.msg ||
          "Failed to add book to cart. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  //Favourites
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://192.168.1.188:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const wishlist = res.data as any[];
      const bookIds = wishlist.map((item: any) => item.bookId._id);
      setWishlistIds(bookIds);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  const handleToggleFavorite = async (bookId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to manage your favorites.",
      });
      return;
    }

    const isAlreadyFav = wishlistIds.includes(bookId);

    try {
      if (!isAlreadyFav) {
        await axios.post(
          "http://192.168.1.188:5000/api/wishlist/add",
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlistIds((prev) => [...prev, bookId]);
        Swal.fire("Added", "Book added to favorites!", "success");
      } else {
        await axios.delete(
          `http://192.168.1.188:5000/api/wishlist/remove/${bookId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlistIds((prev) => prev.filter((id) => id !== bookId));
        Swal.fire("Removed", "Book removed from favorites.", "info");
      }
    } catch (err: any) {
      console.error("Favorite toggle failed", err);
      Swal.fire("Error", err.response?.data?.msg || "Try again", "error");
    }
  };

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
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="w-full px-3 py-2 outline-none text-black"
                />
                <button className="p-2 bg-primary text-white">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>

            {/* Free / Paid Filter */}
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

            {/* Categories Filter */}
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
                {selectedCategory && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setPage(1);
                    }}
                    className="w-full text-left text-sm text-blue-500 hover:underline mt-2"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Book Grid */}
          <div className="lg:w-3/4 w-full">
            <div
              id="book-grid"
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {loading ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  Loading books...
                </div>
              ) : filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    onClick={() => navigate(`/book/${book._id}`)}
                    className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 relative group h-[360px] flex flex-col justify-between"
                  >
                    <img
                      loading="lazy"
                      src={
                        book.image?.startsWith("data:image")
                          ? book.image
                          : `data:image/jpeg;base64,${book.image}`
                      }
                      alt={book.title}
                      className="w-full h-52 object-cover rounded"
                    />
                    <h4 className="mt-3 text-md font-semibold text-black">
                      {book.title}
                    </h4>
                    <div className="text-sm text-gray-600">
                      <span className="text-black font-medium">
                        {book.price?.toLowerCase() === "free"
                          ? "Free"
                          : `$${book.price}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        className={`px-4 py-1 rounded-full text-sm text-white transition ${
                          book.price?.toLowerCase() === "free"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                        }`}
                        disabled={book.price?.toLowerCase() === "free"}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (book.price?.toLowerCase() !== "free")
                            handleAddToCart(book);
                        }}
                      >
                        Add To Cart
                      </button>
                      <div className="flex gap-2">
                        <button
                          title="View"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${book._id}`);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-gray-600 hover:text-black"
                          />
                        </button>
                        <button
                          title="Add to Favourites"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(book._id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={`transition ${
                              wishlistIds.includes(book._id)
                                ? "text-red-500"
                                : "text-gray-600 hover:text-red-400"
                            }`}
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
                  className={`w-9 h-9 flex items-center justify-center rounded-full border border-orange-400 text-sm ${
                    page === i + 1
                      ? "bg-primary text-white bg-orange-600"
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
