const express = require("express");
const router = express.Router();
const Destination = require("../models/Destinations");

// GET all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
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

    // Handle region filter
    if (region) {
      filter.region = { $regex: new RegExp(region, 'i') };
    }

    // Handle category filter
    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    // Handle budget filter
    if (budget) {
      const budgetRegex = new RegExp(budget.replace('₹', '\u20B9'), 'i');
      filter.budget = { $regex: budgetRegex };
    }

    // Handle duration filter
    if (duration) {
      filter.duration = { $regex: new RegExp(duration, 'i') };
    }

    // Handle rating filter
    if (rating) {
      const stars = parseInt(rating.split('⭐').length - 1);
      filter.rating = { $gte: stars };
    }

    // Handle popularity filter
    if (isPopular === 'true') {
      filter.isPopular = true;
    }

    // Handle trending filter
    if (isTrending === 'true') {
      filter.isTrending = true;
    }

    // Add pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Destination.countDocuments(filter);
    
    // Get filtered destinations
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

module.exports = router;
