const jwt = require("jsonwebtoken");

const db = require("../utils/auth");
const User = require("../utils/user");

module.exports = (req, res) => {
  db.checkUser(req.body, (error, result) => {
    if (!result) {
      res.status(400).send({
        error: "Bad username or password.",
      });
    } else {
      User.findOne({ username: req.body.username }, (error, user) => {
        user.lastLogin = new Date();

        user.save(() => {
          let token = jwt.sign(
            { username: req.body.username },
            process.env.JWT_SECRET
          );
          res.status(200).send({
            token,
          });
        });
      });
    }
  });
};
