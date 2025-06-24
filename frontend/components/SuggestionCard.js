import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function SuggestionCard({ suggestion }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Optional: You can add an image if your backend provides one, else show a placeholder */}
      <div className="relative">
        {/* <img
          src={suggestion.image || "/images/destination-placeholder.jpg"}
          alt={suggestion.name}
          className="w-full h-48 object-cover"
        /> */}
        <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center text-5xl">
          🗺️
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
        >
          {isLiked ? (
            <FaHeart className="w-5 h-5 text-sky-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-sky-400" />
          )}
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-sky-900 mb-2">
          {suggestion.name}
        </h3>
        <p className="text-sky-600 mb-2">{suggestion.description}</p>
        <div className="mb-2 text-sm text-sky-700">
          <span className="font-semibold">Estimated Cost:</span>{" "}
          ₹{suggestion.estimatedCost?.toLocaleString?.() ?? suggestion.estimatedCost}
        </div>
        <div className="mb-2 text-sm text-sky-700">
          <span className="font-semibold">Duration:</span> {suggestion.duration}
        </div>
        <div className="mb-2 text-sm text-sky-700">
          <span className="font-semibold">Best Time to Visit:</span> {suggestion.bestTimeToVisit}
        </div>
        <div className="mb-4 text-sm text-sky-700">
          <span className="font-semibold">Activities:</span>{" "}
          {Array.isArray(suggestion.activities)
            ? suggestion.activities.join(", ")
            : suggestion.activities}
        </div>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white font-medium hover:from-sky-500 hover:to-blue-600 transition-all duration-300">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
