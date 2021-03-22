var db = require("../utils/handlers/user");

module.exports = (req, res, next) => {
  db.findOne({ _id: req.session._id }, (err, { posts }) => {
    res.send({
      posts,
    });
  });
};
