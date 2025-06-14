import mongoose from 'mongoose';

const AiSuggestionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
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
  aiResponse: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      estimatedCost: { type: Number, required: true },
      duration: { type: String, required: true },
      bestTimeToVisit: { type: String, required: true },
      activities: [{ type: String }],
    }
  ]
}, {
  timestamps: true
});

const AiSuggestion = mongoose.model('AiSuggestion', AiSuggestionSchema);
export default AiSuggestion;
