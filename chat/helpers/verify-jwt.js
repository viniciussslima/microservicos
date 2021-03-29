const jwt = require("jsonwebtoken");
const db = require("../handlers/user");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(401).json({ message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token." });

    db.findOne({ username: decoded.username }, (error, user) => {
      if (error)
        return res.status(500).json({ message: "Failed to find user." });

      req.user = user;

      next();
    });
  });
};
