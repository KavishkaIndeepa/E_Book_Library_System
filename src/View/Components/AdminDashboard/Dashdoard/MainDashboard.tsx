import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  faBell,
  faUser,
  faBook,
  faClock,
  faDownload,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample data (replace with real data via props or API)
  const [notifications, setNotifications] = useState<any[]>([]);
  const [pendingBooks, setPendingBooks] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchPendingBooks();
  }, []);

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get<any[]>(
        "https://ebooklibrarysystembackend-production.up.railway.app/api/books/all"
      );
      const data = res.data;
      setBooks(data || []); // assuming data is array directly
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingBooks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (users.length === 0) {
        await fetchUsers();
      }

      const res = await axios.get<any>(
        "https://ebooklibrarysystembackend-production.up.railway.app/books/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pending = res.data.books || [];
      setPendingBooks(pending);

      const userMap = new Map(users.map((u: any) => [u._id, u.name]));

      const generatedNotifications = pending.map((book: any) => {
        const username = userMap.get(book.userId);
        return {
          text: `"${book.title}" by ${book.author} was added by ${username}`,
          status: book.status,
          time: book.createdAt || new Date().toISOString(),
        };
      });

      setNotifications(generatedNotifications);
    } catch (err) {
      console.error("Failed to fetch pending books", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users (excluding admin)
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://ebooklibrarysystembackend-production.up.railway.app/api/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const allUsers = res.data as any[];
      const nonAdminUsers = allUsers.filter(
        (user: any) => user.role !== "admin"
      );
      setUsers(nonAdminUsers);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  // Approve book
  const handleApprove = async (id: string) => {
    const result = await Swal.fire({
      title: "Approve Book?",
      text: "This book will be added to the library.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(
          `https://ebooklibrarysystembackend-production.up.railway.app/api/books/approve/${id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await fetchBooks();
        await fetchPendingBooks();
        Swal.fire("Approved!", "The book has been approved.", "success");
      } catch (err) {
        console.error("Failed to approve book", err);
        Swal.fire("Error", "Failed to approve the book", "error");
      }
    }
  };

  // Reject book
  const handleReject = async (id: string) => {
    const result = await Swal.fire({
      title: "Reject Book?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(
          `https://ebooklibrarysystembackend-production.up.railway.app/api/books/reject/${id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await fetchBooks();
        await fetchPendingBooks();
        Swal.fire("Rejected!", "The book has been rejected.", "success");
      } catch (err) {
        console.error("Failed to reject book", err);
        Swal.fire("Error", "Failed to reject the book", "error");
      }
    }
  };

  function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

    return date.toLocaleDateString();
  }

  return (
    <div className="p-6">
      {/* Header with Notification */}
      <div className="flex justify-end mb-6 relative">
        <div
          className="relative cursor-pointer"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FontAwesomeIcon
            icon={faBell}
            className="text-2xl text-gray-600 hover:text-orange-600"
          />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
            {notifications.length}
          </span>
        </div>
        {showNotifications && (
          <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-72 p-4 z-10">
            <h4 className="text-sm font-bold mb-2 text-gray-700">
              Notifications
            </h4>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications yet</p>
            ) : (
              notifications.map((n, i) => (
                <div key={i} className="text-sm text-gray-600 mb-2">
                  <p className="font-medium">{n.text}</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Status: {n.status}</span>
                    <span>{timeAgo(n.time)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-100 p-5 rounded-xl shadow hover:shadow-md transition duration-300">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-3xl text-blue-600"
                />
                <div>
                  <p className="text-sm text-gray-500">Members</p>
                  <h2 className="text-2xl font-bold text-blue-700">
                    {users.length}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-md transition duration-300">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-3xl text-green-600"
                />
                <div>
                  <p className="text-sm text-gray-500">Total Books</p>
                  <h2 className="text-2xl font-bold text-green-700">
                    {books.length}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-yellow-100 p-5 rounded-xl shadow hover:shadow-md transition duration-300">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-3xl text-yellow-600"
                />
                <div>
                  <p className="text-sm text-gray-500">Pending Books</p>
                  <h2 className="text-2xl font-bold text-yellow-700">
                    {pendingBooks.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Books Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Pending Book Approvals
            </h3>
            {pendingBooks.length === 0 ? (
              <p className="text-gray-500">No pending books available.</p>
            ) : (
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <div className="min-w-[600px]">
                  <table className="w-full ">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-3 text-sm font-semibold text-gray-600">
                          Member Name
                        </th>
                        <th className="p-3 text-sm font-semibold text-gray-600">
                          Book Name
                        </th>
                        <th className="p-3 text-sm font-semibold text-gray-600">
                          Cover
                        </th>
                        <th className="p-3 text-sm font-semibold text-gray-600">
                          PDF
                        </th>
                        <th className="p-3 text-sm font-semibold text-gray-600">
                          Price
                        </th>
                        <th className="p-3 text-sm font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingBooks.map((book, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 text-sm">
                            {book.userId
                              ? users.find((user) => user._id === book.userId)
                                  ?.name || "Unknown"
                              : "Admin"}
                          </td>
                          <td className="p-3 text-sm">{book.title}</td>
                          <td className="p-3 text-sm">
                            {book.image ? (
                              <img
                                src={
                                  book.image.startsWith("data:image")
                                    ? book.image
                                    : `data:image/jpeg;base64,${book.image}`
                                }
                                alt="Book Cover"
                                className="h-14 w-10 object-cover rounded"
                              />
                            ) : (
                              <span className="text-xs text-gray-400 italic">
                                No Image
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-sm">
                            <a href={book.pdf} download>
                              <FontAwesomeIcon
                                icon={faDownload}
                                className="text-green-600 text-lg hover:text-green-800"
                              />
                            </a>
                          </td>
                          <td className="p-3 text-sm">$ {book.price}</td>
                          <td className="p-3 text-sm flex gap-3">
                            <button
                              className="text-green-600 hover:text-green-800 text-lg"
                              title="Accept"
                              onClick={() => handleApprove(book._id)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 text-lg"
                              title="Decline"
                              onClick={() => handleReject(book._id)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
