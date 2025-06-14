import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true, // ✅ this creates the unique index already
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
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    },
    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'divorced', 'widowed', 'prefer-not-to-say'],
    },
    travelInterests: [
      {
        type: String,
        enum: [
          'adventure', 'beach', 'cultural', 'culinary',
          'honeymoon', 'road-trips', 'wildlife', 'wellness',
          'sightseeing', 'shopping', 'other',
        ],
      },
    ],
    phoneNumber: String,
    country: String,
    state: String,
    city: String,
    travelGoal: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;
