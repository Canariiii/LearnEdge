var User = require('../models/user');

exports.postUser = function (req, res) {
  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;

  user.save(function (err) {
    if (err)
      res.send(err);

    res.json({ message: 'User added', data: User });

  });
};

exports.getUsers = function (req, res) {
  Users.find(function (err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

exports.getUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

exports.putUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      res.send(err);

    // Update the existing bicycle 
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    user.save(function (err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};

exports.deleteUser = function (req, res) {
  // Use the Bicycle model to find a specific bicycle and remove it
  User.findByIdAndRemove(req.params.user_id, function (err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed!' });
  });
};