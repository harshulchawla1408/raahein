import User from '../models/User.js';

/**
 * @route   POST /api/users
 * @desc    Create or update user in the database
 * @access  Private
 */
export const createOrUpdateUser = async (req, res) => {
  const { uid, email } = req.user;
  const name = req.user.name || req.body.name;

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { email, name },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB Error', err });
  }
};
