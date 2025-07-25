import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  faHeart,
  faMinus,
  faPlus,
  faDownload,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://192.168.1.188:5000/api/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error(err);
      setError("Book not found.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 mt-24 mb-24 text-center text-gray-500">Loading book...</div>
    );
  if (error || !book)
    return <div className="p-10 text-center text-gray-500">{error}</div>;

  const isFree = book.price?.toLowerCase() === "free";
  const imageSrc = book.image?.startsWith("data:image")
    ? book.image
    : `data:image/jpeg;base64,${book.image}`;

  return (
    <div className="min-h-screen mt-24 px-4 md:px-10 py-8 bg-white text-black font-sans transition-all">
      {/* Book Overview Section */}
      <div className="flex flex-col md:flex-row gap-8 animate-fadeIn">
        {/* Book Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img
              src={imageSrc}
              alt={book.title}
              className="h-96 w-full object-cover"
            />
          </div>
        </div>

        {/* Book Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-green-600 font-semibold">
            {isFree ? "Free to Download" : "Available in Stock"}
          </p>

          <div className="flex items-center gap-1 text-red-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            <span className="text-gray-600 ml-2 text-sm">
              (1 Customer Review)
            </span>
          </div>

          <p className="text-gray-600 text-sm">
            {book.description || "No description available."}
          </p>

          {!isFree && (
            <>
              <p className="text-2xl font-bold text-red-500">
                {" "}
                {book.price?.toLowerCase() === "free"
                  ? "Free"
                  : `$${book.price}`}
              </p>
              <div className="flex items-center gap-4">
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  text="Add To Cart"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-4 mt-4">
            <IconButton
              icon={faHeart}
              active={isFav}
              onClick={() => setIsFav(!isFav)}
            />
            {isFree ? (
              <Button
                icon={faDownload}
                className="bg-green-500 hover:bg-green-600 text-white"
                text="Download"
                href={book.pdf}
              />
            ) : (
              <Button
                className="text-red-500 border border-red-500 hover:bg-red-50"
                text="Read A Little"
                onClick={() => setShowModal(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Book Meta Section */}
      <SectionCard title="Book Information">
        <MetaGrid book={book} />
      </SectionCard>

      {/* Tab Section */}
      <SectionCard>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabContent activeTab={activeTab} book={book} />
      </SectionCard>

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-700">
              {book.story || "No story available for this book."}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Components remain unchanged */
const MetaItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <span className="font-semibold text-gray-700">{label}:</span>{" "}
    {value || "N/A"}
  </div>
);

const QuantitySelector = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) => (
  <div className="flex items-center border rounded overflow-hidden">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="px-3 py-1 hover:bg-gray-100 transition"
    >
      <FontAwesomeIcon icon={faMinus} />
    </button>
    <span className="px-4">{quantity}</span>
    <button
      onClick={() => setQuantity(quantity + 1)}
      className="px-3 py-1 hover:bg-gray-100 transition"
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  </div>
);

const Button = ({
  text,
  icon,
  onClick,
  className,
  href,
}: {
  text: string;
  icon?: any;
  onClick?: () => void;
  className: string;
  href?: string;
}) =>
  href ? (
    <a
      href={href}
      download
      className={`px-6 py-2 rounded-full flex items-center gap-2 transition ${className}`}
    >
      {icon && <FontAwesomeIcon icon={icon} />} {text}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full flex items-center gap-2 transition ${className}`}
    >
      {icon && <FontAwesomeIcon icon={icon} />} {text}
    </button>
  );

const IconButton = ({
  icon,
  active,
  onClick,
}: {
  icon: any;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full border transition ${
      active
        ? "text-red-500 border-red-500"
        : "text-gray-600 border-gray-300 hover:border-gray-400"
    }`}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

const SectionCard = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-100 p-6 mt-10 rounded-lg shadow max-w-2xl mx-auto">
    {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
    {children}
  </div>
);

const MetaGrid = ({ book }: { book: any }) => (
  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
    <MetaItem label="SKU" value={book.meta?.sku} />
    <MetaItem label="Tags" value={book.meta?.tags} />
    <MetaItem label="Category" value={book.meta?.category} />
    <MetaItem label="Format" value={book.meta?.format} />
    <MetaItem label="Total Page" value={book.meta?.pages?.toString()} />
    <MetaItem label="Publish Year" value={book.meta?.publishYear?.toString()} />
    <MetaItem label="Language" value={book.meta?.language} />
    <MetaItem label="Century" value={book.meta?.century} />
  </div>
);

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <div className="flex border-b border-gray-300">
    {["Description", "Additional Information", "Reviews"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 py-2 text-center font-semibold transition ${
          activeTab === tab
            ? "text-red-500 border-b-2 border-red-500"
            : "text-gray-500 hover:text-red-500"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

const TabContent = ({ activeTab, book }: { activeTab: string; book: any }) => (
  <div className="p-4 border border-gray-200 rounded-b text-sm text-gray-700 transition-all">
    {activeTab === "Description" && (
      <p>{book.description || "No description available."}</p>
    )}
    {activeTab === "Additional Information" && (
      <div className="grid grid-cols-2 gap-2">
        <MetaItem
          label="Availability"
          value={book.meta?.availability || "Available"}
        />
        <MetaItem
          label="Categories"
          value={book.meta?.category || "Adventure"}
        />
        <MetaItem
          label="Publish Date"
          value={book.meta?.publishYear?.toString() || "N/A"}
        />
        <MetaItem
          label="Total Page"
          value={book.meta?.pages?.toString() || "N/A"}
        />
        <MetaItem label="Format" value={book.meta?.format || "N/A"} />
        <MetaItem label="Language" value={book.meta?.language || "English"} />
      </div>
    )}
    {activeTab === "Reviews" && (
      <p>No reviews yet. Be the first to review this book!</p>
    )}
  </div>
);
