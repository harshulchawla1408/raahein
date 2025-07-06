import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: [String],
  rating: { type: Number, default: 4 },
  priceLevel: Number, // 1: cheap, 2: mid, 3: expensive
  photo: String,
  address: String,
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destinations' },
  createdAt: { type: Date, default: Date.now }
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;