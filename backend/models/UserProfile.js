const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed", "prefer-not-to-say"],
    },
    travelInterests: [{
      type: String,
      enum: ["adventure", "beach", "cultural", "culinary", "honeymoon", "road-trips", "wildlife", "wellness", "sightseeing", "shopping", "other"],
    }],
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    travelGoal: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate profiles for the same user
userProfileSchema.index({ uid: 1 }, { unique: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
