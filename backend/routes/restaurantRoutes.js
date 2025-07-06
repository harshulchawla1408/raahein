import express from "express";
import {
  addRestaurant,
  getRestaurantsByDestination,
  getRestaurantById
} from "../controllers/restaurantController.js";

const router = express.Router();

// Manually add restaurant
router.post("/create", addRestaurant);

// Get all restaurants for a destination
router.get("/by-destination/:destinationId", getRestaurantsByDestination);

// Get restaurant by ID
router.get("/:restaurantId", getRestaurantById);

export default router;
