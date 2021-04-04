const jwt = require("jsonwebtoken");

const db = require("../utils/auth");

module.exports = (req, res) => {
  db.checkUser(req.body, (error, result) => {
    if (!result) {
      res.status(400).send({
        error: "Bad username or password.",
      });
    } else {
      result.lastLogin = new Date();
      result.save(() => {
        let token = jwt.sign(
          { username: req.body.username },
          process.env.JWT_SECRET
        );
        res.status(200).send({
          token,
        });
      });
    }
  });
};
