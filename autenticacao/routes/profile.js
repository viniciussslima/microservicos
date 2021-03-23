const jwt = require("jsonwebtoken");

const db = require("../utils/user");

module.exports = (req, res) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthenticated user" });
    db.findOne(req.query, (error, result) => {
      if (!result) {
        return res.status(400).sed({
          error: "Bad username",
        });
      } else {
        return res.status(200).send(result);
      }
    });
  });
};
