const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_name: String
});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;