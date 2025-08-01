import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHeart,
  faShoppingCart,
  faBook,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [dateTime, setDateTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  const notifications = [
    "Your book has been approved",
    "A new book is available",
    "Your order was placed successfully",
  ];

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchWishlist(),
          fetchCart(),
          fetchPendingBooks(),
          fetchCards(),
          fetchRecentOrders(),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();

    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get<WishlistItem[]>(
        "https://ebooklibrarysystembackend-production.up.railway.app/api/wishlist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get<any>("https://ebooklibrarysystembackend-production.up.railway.app/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const fetchPendingBooks = async () => {
    try {
      const res = await axios.get<any>(
        "https://ebooklibrarysystembackend-production.up.railway.app/api/books/user/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingCount(res.data.books.length);
    } catch (err) {
      console.error("Failed to fetch pending books", err);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await axios.get<any>(
        "https://ebooklibrarysystembackend-production.up.railway.app/api/payment",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCards(res.data);
    } catch (err) {
      console.error("Failed to fetch cards", err);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const res = await axios.get<any []>(
        "https://ebooklibrarysystembackend-production.up.railway.app/api/orders/recent",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecentOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch recent orders", err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">{dateTime}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative focus:outline-none"
          >
            <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-700" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
              <div className="px-4 py-3 font-semibold text-gray-800 border-b bg-gray-50">
                Notifications
              </div>
              <ul className="max-h-64 overflow-y-auto divide-y">
                {notifications.map((note, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {note}
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No new notifications
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <StatCard
            icon={faHeart}
            label="Favorite Items"
            count={wishlist.length}
            bg="from-green-400 to-green-600"
            iconColor="text-white"
          />
          <StatCard
            icon={faShoppingCart}
            label="Cart Items"
            count={cart.length}
            bg="from-teal-400 to-teal-600"
            iconColor="text-white"
          />
          <StatCard
            icon={faBook}
            label="Pending Books"
            count={pendingCount}
            bg="from-sky-400 to-sky-600"
            iconColor="text-white"
          />
          <StatCard
            icon={faCreditCard}
            label="Saved Cards"
            count={cards.length}
            bg="from-slate-400 to-slate-600"
            iconColor="text-white"
          />
        </div>
      )}


      {/* Recent Orders */}
{!isLoading && (
  <div className="mt-10">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>

    {recentOrders.length === 0 ? (
      <p className="text-gray-500">No orders placed in the last 2 days.</p>
    ) : (
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-4"
          >
            {order.books.map((book: any) => (
              <div
                key={book._id}
                className="flex items-center gap-4 border rounded-lg p-3 bg-gray-50"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-blue-600 font-bold">Rs {book.price}</p>
                  <p className="text-sm text-gray-500">
                    Ordered on:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )}
  </div>
)}


    </div>
  );
}

function StatCard({
  icon,
  label,
  count,
  bg,
  iconColor,
}: {
  icon: any;
  label: string;
  count: number;
  bg: string;
  iconColor: string;
}) {
  return (
    <div
      className={`flex items-center rounded-2xl shadow-lg p-6 bg-gradient-to-br ${bg} hover:scale-[1.02] transition-transform duration-200 h-36`}
    >
      <div className={`text-4xl mr-6 ${iconColor}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <div className="text-md text-white font-semibold tracking-wide mb-1">
          {label}
        </div>
        <div className="text-3xl font-bold text-white">{count}</div>
      </div>
    </div>
  );
}
