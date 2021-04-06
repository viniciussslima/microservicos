const jwt = require("jsonwebtoken");

const db = require("../utils/user");

module.exports = (req, res) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthenticated user" });
    user = { username: decoded.username };
    if (req.query.text) {
      return db.search(req.query.text, (error, result) => {
        res.status(200).send(result);
      });
    }
    return db.getAll((error, result) => {
      res.status(200).send(result);
    });
  });
};
