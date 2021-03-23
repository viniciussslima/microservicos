var db = require("../utils/handlers/user");

module.exports = (req, res, next) => {
  db.like(
    { username: req.body.author },
    { by: req.user.username },
    req.body._id,
    (err, result) => {
      if (result) {
        res.send({ event: true, msg: "Liked!" });
      } else {
        res.send({ event: false, msg: "Already liked." });
      }
    }
  );
};
