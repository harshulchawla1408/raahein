const mongoose = require("mongoose");

const AiSuggestionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  age: Number,
  groupType: String,
  interests: [String],
  budget: {
    min: Number,
    max: Number,
  },
  duration: String,
  season: String,
  locationPreference: String,
  aiResponse: [{}],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AiSuggestion", AiSuggestionSchema);