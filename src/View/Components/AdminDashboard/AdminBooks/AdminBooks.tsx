import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 5;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  type Book = {
    _id: string;
    title: string;
    image?: string;
    price?: string;
    category?: string;
    // add other fields as needed
  };

  type BooksResponse = {
    books: Book[];
    total: number;
  };

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get<BooksResponse>(
        `http://192.168.1.188:5000/api/books?page=${page}&limit=${booksPerPage}`
      );
      setBooks(res.data.books);
      setTotalBooks(res.data.total);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://192.168.1.188:5000/api/books/${id}`);
        Swal.fire("Deleted!", "Book has been removed.", "success");
        fetchBooks(currentPage);
      } catch (err) {
        Swal.fire("Error!", "Failed to delete book.", "error");
      }
    }
  };

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="p-6 font-['Quicksand'] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Books Management</h2>
        <button
          onClick={() => navigate("/admin-dashboard/add-books")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2 transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl p-6">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Title
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Image
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Category
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No books found.
                      </td>
                    </tr>
                  ) : (
                    books.map((book, index) => (
                      <tr key={book._id || index} className="border-t">
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
                          {book.price?.toLowerCase() === "free"
                            ? "Free"
                            : `$${book.price}`}
                        </td>
                        <td className="p-3 text-sm">{book.category}</td>
                        <td className="p-3 text-sm flex gap-2">
                          <button
                            title="Edit Book"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() =>
                              navigate(`/admin-dashboard/add-books/${book._id}`)
                            }
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            title="Delete Book"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(book._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-md transition-all duration-200 ${
                        currentPage === num
                          ? "bg-orange-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
