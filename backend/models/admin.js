const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  admin_name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;