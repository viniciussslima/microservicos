var User = require("../utils/models/user");
var Post = require("../utils/handlers/post");
var ta = require("time-ago");

var db = require("../utils/handlers/user");

module.exports = (req, res, next) => {
  db.getAll(async (err, users) => {
    const posts = [];

    for (let i = 0; i < users.length; i++) {
      const user = await User.findOne({ username: users[i].username });

      posts.push({ ...users[i].toObject(), profile_pic: user.profile_pic });
    }

    res.status(200).send({
      people: posts,
      category: req.params.category,
    });
  });
};
