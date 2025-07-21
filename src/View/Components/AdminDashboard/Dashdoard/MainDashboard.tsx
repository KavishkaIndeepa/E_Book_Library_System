import React, { useState } from "react";
import { FaBell, FaUser, FaBook, FaClock, FaDownload, FaTimes, FaCheck } from "react-icons/fa";

export default function MainDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample data (replace with real data via props or API)
  const notifications: any[] = [];
  const pendingBooks: any[] = [];

  return (
    <div className="p-6 font-['Quicksand']">
      {/* Header with Notification */}
      <div className="flex justify-end mb-6 relative">
        <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
          <FaBell className="text-2xl text-gray-600 hover:text-orange-600" />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
            {notifications.length}
          </span>
        </div>
        {showNotifications && (
          <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-72 p-4 z-10">
            <h4 className="text-sm font-bold mb-2 text-gray-700">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications yet</p>
            ) : (
              notifications.map((n, i) => (
                <p key={i} className="text-sm text-gray-600 mb-1">{n}</p>
              ))
            )}
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 p-5 rounded-xl shadow hover:shadow-md transition duration-300">
          <div className="flex items-center gap-4">
            <FaUser className="text-3xl text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Members</p>
              <h2 className="text-2xl font-bold text-blue-700">0</h2>
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-md transition duration-300">
          <div className="flex items-center gap-4">
            <FaBook className="text-3xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <h2 className="text-2xl font-bold text-green-700">0</h2>
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 p-5 rounded-xl shadow hover:shadow-md transition duration-300">
          <div className="flex items-center gap-4">
            <FaClock className="text-3xl text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Pending Books</p>
              <h2 className="text-2xl font-bold text-yellow-700">0</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Books Table */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Pending Book Approvals</h3>
        {pendingBooks.length === 0 ? (
          <p className="text-gray-500">No pending books available.</p>
        ) : (
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 text-sm font-semibold text-gray-600">Member Name</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Book Name</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Cover</th>
                <th className="p-3 text-sm font-semibold text-gray-600">PDF</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Price</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBooks.map((book, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-sm">{book.memberName}</td>
                  <td className="p-3 text-sm">{book.bookName}</td>
                  <td className="p-3 text-sm">
                    <img src={book.coverImage} alt="Cover" className="h-12 w-9 object-cover rounded" />
                  </td>
                  <td className="p-3 text-sm">
                    <a href={book.pdfUrl} download>
                      <FaDownload className="text-green-600 text-lg hover:text-green-800" />
                    </a>
                  </td>
                  <td className="p-3 text-sm">{book.price}</td>
                  <td className="p-3 text-sm flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                      <FaCheck /> Accept
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                      <FaTimes /> Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
