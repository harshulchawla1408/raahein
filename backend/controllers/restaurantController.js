import Restaurant from "../models/Restaurants.js";
import Destinations from "../models/Destinations.js";

// POST: Add restaurant to DB
export const addRestaurant = async (req, res) => {
  try {
    const { name, cuisine, rating, priceLevel, photo, address, coordinates, destinationId } = req.body;

    const destination = await Destinations.findById(destinationId);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const newRestaurant = new Restaurant({
      name,
      cuisine,
      rating,
      priceLevel,
      photo,
      address,
      coordinates,
      destination: destinationId,
    });

    const savedRestaurant = await newRestaurant.save();

    destination.restaurants.push(savedRestaurant._id);
    await destination.save();

    res.status(201).json({ message: "Restaurant added successfully", restaurant: savedRestaurant });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: All restaurants for a destination
export const getRestaurantsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const restaurants = await Restaurant.find({ destination: destinationId });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Restaurant by ID (optional)
export const getRestaurantById = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
