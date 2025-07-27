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
  const token = localStorage.getItem("token");
   const [cart, setCart] = useState<any[]>([]);
   const [pendingCount, setPendingCount] = useState(0);
   const [cards, setCards] = useState([]);

  const notifications = [
    "Your book has been approved",
    "A new book is available",
    "Your order was placed successfully",
  ];

    useEffect(() => {
      fetchWishlist();
      fetchCart();
      fetchPendingBooks();
      fetchCards();
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
      
    }
  };
 
  
    const fetchCart = async () => {
   
    try {
      const res = await axios.get<any>("http://192.168.1.188:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
    
    }
  };
  
  
const fetchPendingBooks = async () => {
  try {
    const res = await axios.get<any>("http://192.168.1.188:5000/api/books/user/pending", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPendingCount(res.data.books.length);
  } catch (err) {
    console.error("Failed to fetch pending books", err);
  }
};
  
const fetchCards = async () => {
  try {
    const res = await axios.get<any>("http://192.168.1.188:5000/api/payment", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCards(res.data);
  } catch (err) {
    console.error("Failed to fetch cards", err);
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-['Quicksand'] relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
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
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="px-4 py-2 font-semibold border-b">Notifications</div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.map((note, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {note}
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <StatCard
          icon={faHeart}
          label="Favorite Items"
          count={wishlist.length}
          bg="from-green-300 to-green-500"
          iconColor="text-white"
        />
        <StatCard
          icon={faShoppingCart}
          label="Cart Items"
          count={cart.length}
          bg="from-teal-300 to-teal-500"
          iconColor="text-white"
        />
        <StatCard
          icon={faBook}
          label="Pending Books"
          count={pendingCount}
          bg="from-sky-300 to-sky-500"
          iconColor="text-white"
        />
        <StatCard
          icon={faCreditCard}
          label="Saved Cards"
          count={cards.length}
          bg="from-slate-300 to-slate-500"
          iconColor="text-white"
        />
      </div>
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
      className={`flex items-center rounded-xl shadow-md p-5 bg-gradient-to-br ${bg} hover:scale-[1.01] transition-all duration-200`}
    >
      <div className={`text-3xl mr-4 ${iconColor}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <div className="text-sm text-gray-700 font-medium">{label}</div>
        <div className="text-xl font-bold text-gray-800">{count}</div>
      </div>
    </div>
  );
}
