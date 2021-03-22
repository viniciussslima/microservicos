const jwt = require("jsonwebtoken");

const db = require("../utils/user");

module.exports = (req, res) => {
  db.createNew(req.body, (error, result) => {
    if (!result) {
      return res.status(400).send({
        error: "Bad user details.",
      });
    } else {
      let token = jwt.sign(
        { username: req.body.username },
        process.env.JWT_SECRET
      );

      res.status(200).send({
        token,
      });
    }
  });
};
