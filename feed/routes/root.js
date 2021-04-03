var db = require("../utils/handlers/user");
var dbPost = require("../utils/handlers/post");
var ta = require("time-ago");

module.exports = (req, res, next) => {  
    dbPost.getAll((err, post) => {
      console.log(post);
      var posts = [];
      for (var i = 0; i < post.length; i++) {
        for (var j = 0; j < post[i].posts.length; j++) {
          post[i].posts[j].timeago = ta.ago(post[i].posts[j].createdAt);
          posts.push({ user: post[i].username, post: post[i].posts[j] });
        }
      }

      res.send(posts.reverse());
    });      
};
