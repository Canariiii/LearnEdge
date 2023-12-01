const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  
});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;