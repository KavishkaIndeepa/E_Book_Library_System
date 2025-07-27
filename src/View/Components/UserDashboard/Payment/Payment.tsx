import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

type CardType = {
  _id: string;
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export default function Payment() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    if (!token) return;
    try {
      const res = await axios.get<CardType[]>("http://192.168.1.188:5000/api/payment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards", err);
    }
  };

  const onSubmit = async (data: any) => {
    if (!token) {
      Swal.fire("Login Required", "Please login to proceed.", "warning");
      return;
    }

    try {
      if (selectedCardId) {
        await axios.put(`http://192.168.1.188:5000/api/payment/${selectedCardId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Updated", "Card updated successfully", "success");
      } else {
        await axios.post("http://192.168.1.188:5000/api/payment", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Saved", "Card saved successfully", "success");
      }
      reset();
      setSelectedCardId(null);
      fetchCards();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save card.", "error");
    }
  };

  const handleSelectCard = (card: CardType) => {
    setSelectedCardId(card._id);
    setValue("cardHolder", card.cardHolder);
    setValue("cardNumber", card.cardNumber);
    setValue("expiry", card.expiry);
    setValue("cvv", card.cvv);
  };

  const handleDeleteCard = async () => {
    if (!selectedCardId || !token) return;
    try {
      await axios.delete(`http://192.168.1.188:5000/api/payment/${selectedCardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted", "Card removed.", "success");
      reset();
      setSelectedCardId(null);
      fetchCards();
    } catch (err) {
      Swal.fire("Error", "Failed to delete card.", "error");
    }
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-6 gap-6">
      {/* Left: Card Preview */}
      <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 justify-center">
        {cards.length > 0 && (
          <div className="relative w-full max-w-md h-56">
            {/* Arrows */}
            <button
              onClick={handlePrevCard}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
              onClick={handleNextCard}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Animated Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={cards[currentCardIndex]._id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleSelectCard(cards[currentCardIndex])}
                className="group w-full h-full cursor-pointer [perspective:1000px] px-10"
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute w-full h-full bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl text-white p-6 [backface-visibility:hidden] bg-gradient-to-br from-blue-500/40 to-black">
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-8 bg-yellow-300 rounded-sm shadow-inner"></div>
                      <span className="text-2xl font-bold tracking-widest">VISA</span>
                    </div>
                    <div className="text-2xl tracking-widest font-mono mb-6">
                      {cards[currentCardIndex].cardNumber}
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <div>{cards[currentCardIndex].cardHolder.toUpperCase()}</div>
                      <div>{cards[currentCardIndex].expiry}</div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute w-full h-full bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-gray-800/40 to-black/60">
                    <div className="w-full h-10 bg-black mb-6 rounded"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CVV</span>
                      <span className="text-lg font-semibold tracking-widest">
                        {cards[currentCardIndex].cvv}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 text-sm font-light text-gray-300">
                      VISA SECURE
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Dots */}
        {cards.length > 1 && (
          <div className="flex justify-center mt-2 space-x-2">
            {cards.map((_, index) => (
              <span
                key={index}
                className={`text-xl ${
                  index === currentCardIndex ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {index === currentCardIndex ? "●" : "○"}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Payment Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2"
      >
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            {...register("cardHolder", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters and spaces allowed",
              },
            })}
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm mt-1">{errors.cardHolder.message as string}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            maxLength={19}
            placeholder="1234-5678-9012-3456"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                message: "Use format: 1234-5678-9012-3456",
              },
            })}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
              const formatted = raw.replace(/(.{4})/g, "$1-").replace(/-$/, "");
              e.target.value = formatted;
            }}
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message as string}</p>
          )}
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Valid Through</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              {...register("expiry", {
                required: "Expiry is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/([2-9][6-9]|[3-9][0-9])$/,
                  message: "Format MM/YY (YY ≥ 26)",
                },
              })}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.length >= 3) {
                  val = val.slice(0, 2) + "/" + val.slice(2, 4);
                }
                e.target.value = val;
              }}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry.message as string}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="password"
              maxLength={3}
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "CVV must be 3 digits",
                },
              })}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv.message as string}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {selectedCardId ? "Update Card" : "Save Card"}
          </button>
          {selectedCardId && (
            <button
              type="button"
              onClick={handleDeleteCard}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Delete Card
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
