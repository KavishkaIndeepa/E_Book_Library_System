import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faDownload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type Book = {
  _id: string;
  title: string;
  image: string;
  price: number | string;
  pdf: string;
};

type WishlistItem = {
  _id: string;
  bookId: Book;
};

export default function Favourites() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get<WishlistItem[]>(
        "http://192.168.1.188:5000/api/wishlist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId: string) => {
    try {
      await axios.delete(
        `http://192.168.1.188:5000/api/wishlist/remove/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist((prev) => prev.filter((item) => item.bookId._id !== bookId));
      Swal.fire("Removed", "Item removed from wishlist.", "success");
      fetchWishlist(); 
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to remove item", "error");
    }
  };

  const addToCart = async (bookId: string) => {
    try {
      await axios.post(
        `http://192.168.1.188:5000/api/cart/add`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await removeFromWishlist(bookId);
      Swal.fire("Added", "Book added to cart", "success");
      fetchWishlist();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

const downloadPDF = (pdfDataUrl: string, title: string) => {
  const link = document.createElement("a");
  link.href = pdfDataUrl;
  link.download = `${title}.pdf`;
  link.click();
};



  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {wishlist.map(({ _id, bookId }) => (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col md:flex-row gap-6 items-center border border-gray-200"
            >
              <img
                src={bookId.image}
                alt={bookId.title}
                className="w-full md:w-48 h-48 object-cover rounded-xl"
              />
              <div className="flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-xl font-semibold mb-1">{bookId.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {bookId.price === 0 || bookId.price === "Free" ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span className="text-blue-700 font-semibold">
                      ${bookId.price}
                    </span>
                  )}
                </p>

                <div className="flex justify-center md:justify-start gap-4 mt-2">
                  {/* Remove Icon */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-600 cursor-pointer text-xl p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                    onClick={() => removeFromWishlist(bookId._id)}
                    title="Remove"
                  />

                  {/* Cart / Download Icon */}
                  {bookId.price === 0 || bookId.price === "Free" ? (
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="text-emerald-600 hover:text-emerald-700 cursor-pointer text-xl p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition"
                      onClick={() => downloadPDF(bookId.pdf, bookId.title)}
                      title="Download PDF"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="text-indigo-600 hover:text-indigo-700 cursor-pointer text-xl p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
                      onClick={() => addToCart(bookId._id)}
                      title="Add to Cart"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
