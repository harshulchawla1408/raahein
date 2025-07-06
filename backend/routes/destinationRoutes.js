import express from "express";
import Destination from "../models/Destinations.js";

const router = express.Router();

// GET all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// GET destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// GET destinations by filters
router.get("/filter", async (req, res) => {
  try {
    const { 
      region, 
      category, 
      duration, 
      budget, 
      rating, 
      isPopular, 
      isTrending 
    } = req.query;

    const filter = {};

    if (region) {
      filter.region = { $regex: new RegExp(region, 'i') };
    }

    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    if (budget) {
      const budgetRegex = new RegExp(budget.replace('₹', '\u20B9'), 'i');
      filter.budget = { $regex: budgetRegex };
    }

    if (duration) {
      filter.duration = { $regex: new RegExp(duration, 'i') };
    }

    if (rating) {
      const stars = parseInt(rating.split('⭐').length - 1);
      filter.rating = { $gte: stars };
    }

    if (isPopular === 'true') {
      filter.isPopular = true;
    }

    if (isTrending === 'true') {
      filter.isTrending = true;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await Destination.countDocuments(filter);
    
    const destinations = await Destination.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ 
        rating: -1, 
        isPopular: -1, 
        isTrending: -1 
      });

    res.json({
      data: destinations,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error("Filtering error:", err);
    res.status(400).json({ error: "Error filtering destinations" });
  }
});

// POST - Add new destination
router.post("/", async (req, res) => {
  try {
    const dest = new Destination(req.body);
    await dest.save();
    res.status(201).json(dest);
  } catch (err) {
    res.status(400).json({ error: "Invalid Data" });
  }
});

export default router;
