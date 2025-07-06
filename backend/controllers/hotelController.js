import Hotel from "../models/Hotels.js";
import Destinations from "../models/Destinations.js";

// POST: Add hotel to DB
export const addHotel = async (req, res) => {
  try {
    const { name, address, rating, price, photo, coordinates, destinationId } = req.body;

    const destination = await Destinations.findById(destinationId);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const newHotel = new Hotel({ name, address, rating, price, photo, coordinates, destination: destinationId });
    const savedHotel = await newHotel.save();

    destination.hotels.push(savedHotel._id);
    await destination.save();

    res.status(201).json({ message: "Hotel added successfully", hotel: savedHotel });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: All hotels for a destination
export const getHotelsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const hotels = await Hotel.find({ destination: destinationId });

    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Hotel by ID (optional)
export const getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
