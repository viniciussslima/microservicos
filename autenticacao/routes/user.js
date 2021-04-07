const jwt = require("jsonwebtoken");
var ta = require("time-ago");

const db = require("../utils/auth");

module.exports = (req, res) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthenticated user" });
    user = { username: decoded.username };
    db.findOne(user, (error, result) => {      
      if (!result) {
        return res.status(400).send({
          error: "Bad username",
        });
      } else {
        result = result.toObject();
        result.lastSeen = ta.ago(result.lastLogin);
        return res.status(200).send(result);
      }
    });
  });
};
