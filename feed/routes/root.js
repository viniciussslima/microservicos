var db = require("../utils/handlers/user");
var ta = require("time-ago");

module.exports = (req, res, next) => {
  db.getAll((err, users) => {
    var posts = [];
    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < users[i].posts.length; j++) {
        users[i].posts[j].timeago = ta.ago(users[i].posts[j].createdAt);
        posts.push({ user: users[i], post: users[i].posts[j] });
      }
    }

    res.send(posts.reverse());
  });
};
