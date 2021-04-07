const jwt = require("jsonwebtoken");

const db = require("../utils/user");
const dbAuth = require("../utils/auth");

module.exports = (req, res) => {
  dbAuth.createNew(req.body, (err, resultAuth) => {
    db.createNew(req.body, (error, result) => {
      if (!resultAuth) {
        return res.status(400).send({
          error: "Bad user details.",
        });
      } else if (!result) {
        return res.status(400).send({
          error: "Bad user details.",
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
  });
};
