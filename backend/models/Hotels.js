import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  rating: { type: Number, default: 4 },
  price: Number, // Approx price per night
  photo: String,
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destinations' },
  createdAt: { type: Date, default: Date.now }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
