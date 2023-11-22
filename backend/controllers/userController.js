const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ _id: user._id }, 'your_secret_key');
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.filename = '';
    if (req.file) {
      newUser.filename = req.file.filename;
    }
    await newUser.save();
    const token = createToken(newUser);
    res.status(201).json({ success: true, data: newUser, token });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Both username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!user._id) {
      return res.status(500).json({ success: false, error: 'User ID is missing or invalid' });
    }

    const token = createToken(user);
    res.json({ success: true, token, data: { _id: user._id } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log("Deleting user with ID:", req.params._id);
    const user = await User.findByIdAndDelete(req.params._id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};