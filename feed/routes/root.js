var User = require("../utils/models/user");
var Post = require("../utils/handlers/post");
var ta = require("time-ago");

module.exports = (req, res, next) => {
  Post.getAll(async (err, post) => {
    var posts = [];
    for (var i = 0; i < post.length; i++) {
      const user = await User.findOne({ username: post[i].username });

      for (var j = 0; j < post[i].posts.length; j++) {
        post[i].posts[j].timeago = ta.ago(post[i].posts[j].createdAt);
        posts.push({
          user: {
            username: post[i].username,
            profile_pic: user.profile_pic,
          },
          post: post[i].posts[j],
        });
      }
    }

    res.status(200).send(posts.reverse());
  });
};
