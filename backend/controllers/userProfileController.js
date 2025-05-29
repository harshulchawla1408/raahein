const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

// Get or create user profile
const getUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    
    // Find the user to get name and email
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create profile
    let profile = await UserProfile.findOne({ uid });
    
    // If profile doesn't exist, create a new one with basic info
    if (!profile) {
      profile = new UserProfile({
        uid,
        name: user.name,
        email: user.email
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create or update user profile
const updateUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const updateData = req.body;

    // Remove any attempt to update uid, name, or email from frontend
    const { uid: _uid, name: _name, email: _email, ...safeUpdateData } = updateData;

    // Get user data to ensure they exist and get their name/email
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update or create the profile
    const profile = await UserProfile.findOneAndUpdate(
      { uid },
      {
        ...safeUpdateData,
        // Always set name and email from the User model to keep in sync
        name: user.name,
        email: user.email,
      },
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true 
      }
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
