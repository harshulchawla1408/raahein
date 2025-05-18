const User = require("../models/User");

const createOrUpdateUser = async (req, res) => {
  const { uid, email } = req.user;
  // Use name from token if present, otherwise from body
  const name = req.user.name || req.body.name;

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { email, name },
      { new: true, upsert: true }
    );
    console.log('Data being sent from backend:', user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "DB Error", err });
  }
};

module.exports = { createOrUpdateUser };