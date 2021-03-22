var db = require("../utils/handlers/user");

module.exports = (req, res, next) => {
  db.getAll((err, users) => {
    res.status(200).send({
      people: users,
      category: req.params.category,
    });
  });
};
