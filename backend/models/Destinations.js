import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  images: [String],
  budget: { type: String },
  duration: { type: String },
  bestSeason: [String],
  description: { type: String },
  highlights: [String],
  rating: { type: Number, default: 4 },
  isPopular: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Destinations = mongoose.model('Destinations', destinationSchema);
export default Destinations;
