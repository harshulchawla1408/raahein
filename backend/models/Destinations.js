const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true }, // North, South, etc.
  category: { type: String, required: true }, // adventure, beach, etc.
  image: { type: String }, // primary image URL
  images: [String], // extra gallery images
  budget: { type: String }, // e.g., "< ₹10k", "₹10k–20k"
  duration: { type: String }, // e.g., "Weekend", "1 Week"
  bestSeason: [String], // e.g., ["Winter", "Monsoon"]
  description: { type: String },
  highlights: [String], // top attractions
  rating: { type: Number, default: 4 },
  isPopular: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Destinations", destinationSchema);
 