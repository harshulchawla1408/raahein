import express from "express";
import { addHotel, getHotelsByDestination, getHotelById } from "../controllers/hotelController.js";

const router = express.Router();

// Manually add a hotel
router.post("/create", addHotel);

// Get all hotels for a destination
router.get("/by-destination/:destinationId", getHotelsByDestination);

// Get hotel by ID
router.get("/:hotelId", getHotelById);

export default router;
