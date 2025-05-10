const User = require("../models/User");

const createOrUpdateUser = async (req, res) => {
  const { uid, email, name } = req.user;

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { email, name },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "DB Error", err });
  }
};

module.exports = { createOrUpdateUser };