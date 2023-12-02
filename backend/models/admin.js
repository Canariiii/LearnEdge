const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

});

adminSchema.methods.manageCourse = async function (courseData) {
    
},

    adminSchema.methods.manageUsers = async function (userData) {
       
    }

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;