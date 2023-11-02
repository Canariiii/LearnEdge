const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const user = new User({ username, password, email, role });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser
};
