const jwt = require("jsonwebtoken");
var ta = require("time-ago");

const db = require("../utils/user");

module.exports = (req, res) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthenticated user" });
    user = { username: decoded.username };
    db.getAll((error, result) => {
      return res.status(200).send(result);
    });
  });
};
