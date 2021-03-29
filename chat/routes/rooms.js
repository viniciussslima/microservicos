var User = require("../models/user");

module.exports = (req, res) => {
  User.find({}).exec((error, users) => {
    res.status(200).send(users);
  });
};
