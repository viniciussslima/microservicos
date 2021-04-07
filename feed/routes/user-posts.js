var User = require("../utils/handlers/user");
var Post = require("../utils/handlers/post");
var ta = require("time-ago");

module.exports = (req, res, next) => {
  const { username } = req.params;

  Post.findByUsername(username, (err, posts) => {
    res.status(200).send(posts);
  });
};
