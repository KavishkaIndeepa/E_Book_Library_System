import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCreditCard } from "@fortawesome/free-solid-svg-icons";

interface Book {
  _id: string;
  title: string;
  image: string;
  price: number;
  pdf?: string;
}

interface CartItem {
  bookId: Book;
  quantity: number;
}

interface CardInfo {
  _id: string;
  cardHolder: string;
  cardNumber: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
    fetchCards();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get<any>("http://192.168.1.188:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await axios.get<any[]>(
        "http://192.168.1.188:5000/api/payment",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCards(res.data);
    } catch (err) {
      console.error("Failed to fetch cards", err);
    }
  };

  const removeItem = async (bookId: string) => {
    try {
      await axios.delete(
        `http://192.168.1.188:5000/api/cart/remove/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire("Removed", "Item removed from cart.", "success");
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const downloadPDF = (pdfDataUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = pdfDataUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmAndPay = async () => {
    if (!selectedCard || selected.length === 0) {
      Swal.fire(
        "Error",
        "Please select at least one book and a card.",
        "error"
      );
      return;
    }

    const selectedBooks = cart.filter((item) =>
      selected.includes(item.bookId._id)
    );
    if (selectedBooks.length === 0) {
      Swal.fire("Error", "No selected books found in cart.", "error");
      return;
    }

    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user || !user._id) {
        Swal.fire("Error", "User not found. Please log in again.", "error");
        return;
      }

      const userId = user._id;
      const bookIds = selectedBooks.map((item) => item.bookId._id);

      // Handle total: skip free books
      const total = selectedBooks.reduce((sum, item) => {
        const price = Number(item.bookId.price) || 0;
        return sum + price;
      }, 0);

      await axios.post(
        "http://192.168.1.188:5000/api/orders",
        {
          userId,
          books: bookIds,
          total,
          paymentId: selectedCard._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Download all PDFs
      for (const item of selectedBooks) {
        if (item.bookId.pdf) {
          const base64 = item.bookId.pdf.startsWith("data:")
            ? item.bookId.pdf
            : `data:application/pdf;base64,${item.bookId.pdf}`;
          downloadPDF(base64, item.bookId.title);
        }
      }

      // Remove purchased books from cart
      for (const item of selectedBooks) {
        await axios.delete(
          `http://192.168.1.188:5000/api/cart/remove/${item.bookId._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      Swal.fire("Success", "Books purchased and downloaded!", "success");
      fetchCart();
      setSelected([]);
      setShowSummary(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment or download failed", "error");
    }
  };

  const handleSelect = (bookId: string) => {
    setSelected((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const totalPrice = cart
    .filter((item) => selected.includes(item.bookId._id))
    .reduce((acc, curr) => acc + curr.bookId.price * curr.quantity, 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">My Cart</h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map(({ bookId, quantity }) => (
            <div
              key={bookId._id}
              className={`flex items-center gap-4 bg-white shadow rounded-xl p-4 border ${
                selected.includes(bookId._id) ? "border-blue-400" : ""
              }`}
              onClick={() => handleSelect(bookId._id)}
            >
              <input
                type="checkbox"
                checked={selected.includes(bookId._id)}
                onChange={() => handleSelect(bookId._id)}
                className="accent-blue-500"
              />
              <img
                src={bookId.image}
                alt={bookId.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{bookId.title}</h3>
                {/* <p className="text-gray-500">Qty: {quantity}</p> */}
                <p className="text-blue-600 font-bold">Rs {bookId.price}</p>
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => removeItem(bookId._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />
            </div>
          ))}

          {selected.length > 0 && (
            <div className="text-right mt-4">
              <button
                onClick={() => setShowSummary(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Buy Selected
              </button>
            </div>
          )}
        </div>
      )}

      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Order Summary
            </h2>

            <div className="mb-4 max-h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {cart
                .filter((item) => selected.includes(item.bookId._id))
                .map(({ bookId }) => (
                  <div key={bookId._id} className="flex justify-between mb-2">
                    <span className="text-gray-700">{bookId.title}</span>
                    <span className="text-blue-600 font-semibold">
                      $ {bookId.price}
                    </span>
                  </div>
                ))}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-right mb-4 border border-blue-200">
              <span className="text-lg font-semibold text-blue-800">
                Total: $ {totalPrice}
              </span>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Card
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const card = cards.find((c) => c._id === e.target.value);
                    setSelectedCard(card || null);
                  }}
                >
                  <option value="">-- Choose a card --</option>
                  {cards.map((card) => (
                    <option key={card._id} value={card._id}>
                      **** **** **** {card.cardNumber.slice(-4)} -{" "}
                      {card.cardHolder}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              {selectedCard && (
                <p className="mt-2 text-sm text-gray-500">
                  Paying with:{" "}
                  <span className="font-medium text-gray-700">
                    {selectedCard.cardHolder}
                  </span>
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSummary(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmAndPay}
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
