import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddBooks() {
  const [bookImage, setBookImage] = useState<string | null>(null);
  const [bookPdf, setBookPdf] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    story: "",
    description: "",
    meta: {
      sku: "",
      tags: "",
      format: "",
      pages: "",
      publishYear: "",
      language: "",
      country: "",
      availability: "",
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();

   useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchBookDetails(id);
    }
  }, [id]);

  const categoryOptions = [
    "Arts & Photography",
    "Biographies & Memoirs",
    "Christian Books & Bibles",
    "Research & Publishing Guides",
    "Sports & Outdoors",
    "Food & Drink",
  ];

  const fetchBookDetails = async (bookId: string) => {
    try {
      const res = await axios.get(`http://192.168.1.188:5000/api/books/`);
      //@ts-ignore
      const book = res.data.find((b: any) => b._id === bookId);
      if (book) {
        setForm({
          title: book.title,
          price: book.price,
          category: book.category,
          story: book.story,
          description: book.description,
          meta: book.meta || {}
        });
        setBookImage(book.image || null);
        setBookPdf(book.pdf || null);
      }
    } catch (err) {
      console.error("Failed to fetch book", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in form.meta) {
      setForm((prev) => ({ ...prev, meta: { ...prev.meta, [name]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBookImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBookPdf(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      price: form.price,
      category: form.category,
      image: bookImage,
      pdf: bookPdf,
      story: form.story,
      description: form.description,
      meta: form.meta
    };

    try {
      if (isEditMode && id) {
        await axios.put(`http://192.168.1.188:5000/api/books/${id}`, payload);
        Swal.fire("Updated!", "Book updated successfully.", "success");
      } else {
        await axios.post("http://192.168.1.188:5000/api/books/", payload);
        Swal.fire("Saved!", "Book added successfully.", "success");
      }
      setTimeout(() => navigate("/admin-dashboard/books"), 2000);
    } catch (err) {
      Swal.fire("Error", "Failed to save the book.", "error");
    }
  };


  return (
    <div className="p-6 font-['Quicksand'] w-full">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-orange-600 text-lg"
        >
          <FaArrowLeft />
        </button>
         <h2 className="text-2xl font-bold text-gray-700">{isEditMode ? "Edit Book" : "Add New Book"}</h2>
      </div>

      {/* Title, Price, Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 text-sm font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter Book Title"
            className="border p-3 rounded-lg shadow w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="text"
            placeholder="0 for Free or Enter Price (e.g., 100)"
            className="border p-3 rounded-lg shadow w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Category</label>
          <input
            list="category-options"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Select or type category"
            className="border p-3 rounded-lg shadow w-full"
          />
          <datalist id="category-options">
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Image and PDF Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="border p-3 rounded-lg shadow">
          <label className="block mb-2 font-semibold">Upload Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {bookImage && (
            <img
              src={bookImage}
              alt="Preview"
              className="mt-2 w-20 h-28 object-cover rounded"
            />
          )}
        </div>
        <div className="border p-3 rounded-lg shadow">
          <label className="block mb-2 font-semibold">Upload Book</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
          />
          {bookPdf && (
            <p className="mt-2 text-sm text-green-700 font-medium">
              PDF uploaded
            </p>
          )}
        </div>
      </div>

      {/* Story & Description */}
      <div className="grid grid-cols-1 mt-4">
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Short Story
          </label>
          <textarea
            name="story"
            value={form.story}
            onChange={handleChange}
            placeholder="Enter a brief story about the book"
            className="border p-3 rounded-lg shadow w-full"
          ></textarea>
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-sm font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter a detailed description about the book"
            className="border p-3 rounded-lg shadow w-full"
          ></textarea>
        </div>
      </div>

      {/* Meta Information */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-700">
        Meta Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(form.meta).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-1 text-sm font-semibold capitalize">
              {key}
            </label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="border p-3 rounded-lg shadow w-full"
              type={
                key === "pages" || key === "publishYear" ? "number" : "text"
              }
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow text-sm font-semibold transition-all duration-200"
        >
          {isEditMode ? "Update Book" : "Save Book"}
        </button>
      </div>
    </div>
  );
}
