var User = require("../models/user");

module.exports = (req, res) => {
  User.find({}).exec((error, users) => {
    let index = users.findIndex((user) => user.id === req.user.id);
    users.splice(index, 1);
    res.status(200).send(users);
  });
};
