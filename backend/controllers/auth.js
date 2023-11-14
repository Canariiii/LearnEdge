const jwt = require('jsonwebtoken');
const utils = require('../utils');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require("../models/user"); 

exports.signin = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  User.findOne({ username: user })
    .then(data => {
      if (!data) {
        return res.status(401).send('User not found!');
      }

      const result = bcrypt.compareSync(pwd, data.password);
      if (!result) return res.status(401).send('Password not valid!');

      const token = utils.generateToken(data);
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user: " + err.message
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    User.findOne({ _id: mongoose.Types.ObjectId(user.id) })
      .then(data => {
        if (!data) {
          return res.status(401).json({
            error: true,
            message: "Invalid user."
          });
        }
        next();
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user: " + err.message
        });
      });
  });
};
