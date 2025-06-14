import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';

/**
 * @route   GET /api/user/profile
 * @desc    Get or create a user's profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = await UserProfile.findOne({ uid });

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

/**
 * @route   PUT /api/user/profile
 * @desc    Update or create user profile with frontend data
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const updateData = req.body;

    // Strip sensitive keys to prevent overwrite from frontend
    const { uid: _uid, name: _name, email: _email, ...safeUpdateData } = updateData;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await UserProfile.findOneAndUpdate(
      { uid },
      {
        ...safeUpdateData,
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
