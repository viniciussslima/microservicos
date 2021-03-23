var db = require("../utils/handlers/user");

module.exports = (req, res) => {
  db.comment(
    { username: req.body.author },
    { by: req.user.username, text: req.body.text },
    req.body._id,
    (err, result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(400).send();
      }
    }
  );
};
