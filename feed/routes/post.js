var db = require("../utils/handlers/post");
const fs = require("file-system");

module.exports = (req, res, next) => {
  switch (req.params.action) {
    case "edit":
      res.send();
      break;
    case "delete":
      {
        db.findOne({ username: req.session.user }, (err, u) => {
          let id = req.params.query;
          console.log(u);
          if (
            u.posts[u.posts.indexOf(u.posts.find((x) => x._id == id))]
              .static_url
          )
            fs.unlinkSync(
              "./public" +
                u.posts[u.posts.indexOf(u.posts.find((x) => x._id == id))]
                  .static_url
            );
          u.posts.splice(u.posts.indexOf(u.posts.find((x) => x._id == id)), 1);
          u.save((err) => {
            if (err) throw err;
            console.log("Post deleted");
            res.status(204).send();
          });
        });
      }
      break;
    default:
      res.send("hi");
  }
};
