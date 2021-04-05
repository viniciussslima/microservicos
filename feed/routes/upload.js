var db = require("../utils/handlers/user");
var dbPost = require("../utils/handlers/post");
const fs = require("file-system");
const mime = require("mime-types");
var path = require("path");
var mv = require("mv");
var guid = require("guid");
const { cloudinary, isSetup } = require("../config/cloudinary");

module.exports = (req, res, next) => {
  // Generate a random id
  var random_id = guid.raw();
  var final_location, type;
  if (req.files.filetoupload && req.files.filetoupload.name && isSetup) {
    cloudinary.v2.uploader.upload(
      req.files.filetoupload.path,
      function (error, result) {
        if (!error) {
          final_location = result.url;
          type = mime.lookup(req.files.filetoupload.name).split("/")[1];
          dbPost.findOne({ username: req.user.username }, (err, u) => {
            if (u) {
              u.posts.push({
                _id: random_id,
                author: req.user.username,
                authorID: u._id,
                static_url: final_location,
                caption: req.body.caption,
                category: req.body.type,
                comments: [],
                likes: [],
                type: type,
                createdAt: new Date(),
                lastEditedAt: new Date(),
              });
              u.save((err) => {
                if (err) throw err;
                res.status(204).send();
              });
            } else {
              dbPost.createNew(
                {
                  username: req.user.username,
                  profile_pic: "/images/logo/logo.png",
                  posts: [
                    {
                      _id: random_id,
                      author: req.user.username,
                      authorID: p._id,
                      static_url: final_location,
                      caption: req.body.caption,
                      category: req.body.type,
                      comments: [],
                      likes: [],
                      type: type,
                      createdAt: new Date(),
                      lastEditedAt: new Date(),
                    },
                  ],
                },
                (err, p) => {
                  p.save((err) => {
                    if (err) throw err;
                    res.status(204).send();
                  });
                }
              );
              res.status(204).send();
            }
          });
        }
      }
    );
  } else if (req.files.filetoupload && req.files.filetoupload.name) {
    var oldpath = req.files.filetoupload.path;
    var newpath = path.join(
      __dirname,
      `../public/feeds/${req.user._id}_${random_id}${req.files.filetoupload.name}`
    );
    var final_location = `/feeds/${req.user._id}_${random_id}${req.files.filetoupload.name}`;
    var type = mime.lookup(req.files.filetoupload.name).split("/")[1];
    mv(oldpath, newpath, function (err) {});
    dbPost.findOne({ username: req.user.username }, (err, p) => {
      if (p) {
        p.posts.push({
          _id: random_id,
          author: req.user.username,
          authorID: p._id,
          static_url: final_location,
          caption: req.body.caption,
          category: req.body.type,
          comments: [],
          likes: [],
          type: type,
          createdAt: new Date(),
          lastEditedAt: new Date(),
        });
        p.save((err) => {
          if (err) throw err;
          res.status(204).send();
        });
      } else {
        dbPost.createNew(
          {
            username: req.user.username,
            profile_pic: "/images/logo/logo.png",
            posts: [
              {
                _id: random_id,
                author: req.user.username,
                authorID: p._id,
                static_url: final_location,
                caption: req.body.caption,
                category: req.body.type,
                comments: [],
                likes: [],
                type: type,
                createdAt: new Date(),
                lastEditedAt: new Date(),
              },
            ],
          },
          (err, p) => {
            p.save((err) => {
              if (err) throw err;
              res.status(204).send();
            });
          }
        );
      }
    });
  }
};
