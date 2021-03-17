var express = require("express");
var router = express.Router();
var path = require("path");
var guid = require("guid");
var mv = require("mv");
const mime = require("mime-types");
var db = require("../utils/handlers/user");
var formParser = require("../utils/form-parser.js");
const fs = require("file-system");
const { cloudinary, isSetup } = require("../config/cloudinary.js");

var image_types = ["png", "jpeg", "gif"];

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.findOne({ _id: req.session._id }, (err, user) => {
    res.send({
      user: user,
    });
  });
});

// router.get("/settings", function (req, res, next) {
//   db.findOne({ _id: req.session._id }, (err, user) => {
//     res.send({
//       user: user,
//     });
//   });
// });

router.get("/activity", function (req, res, next) {
  db.findOne({ _id: req.session._id }, (err, user) => {
    res.status(200).send({
      activity: user.notifications,
    });
  });
});

router.get("/post/:action/:query", function (req, res, next) {
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
});

router.post("/upload", formParser, function (req, res, next) {
  // Generate a random id
  var random_id = guid.raw();
  var final_location, type;
  if (req.files.filetoupload.name && isSetup) {
    cloudinary.v2.uploader.upload(
      req.files.filetoupload.path,
      function (error, result) {
        console.log(result, error);
        if (!error) {
          final_location = result.url;
          type = mime.lookup(req.files.filetoupload.name).split("/")[1];
          db.findOne({ username: req.session.user }, (err, u) => {
            console.log(u);
            if (u != undefined) {
              u.posts.push({
                _id: random_id,
                author: req.session.user,
                authorID: req.session._id,
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
                console.log("Post saved");
                // Redirect back after the job is done.
                res.status(204).send();
              });
            } else {
              res.status(204).send();
            }
          });
        }
      }
    );
  } else if (req.files.filetoupload.name) {
    // Assign static_url path
    var oldpath = req.files.filetoupload.path;
    var newpath = path.join(
      __dirname,
      `../public/feeds/${req.session.user}_${random_id}${req.files.filetoupload.name}`
    );
    var final_location = `/feeds/${req.session.user}_${random_id}${req.files.filetoupload.name}`;

    console.log(
      `${oldpath} - OldPath\n ${newpath} - Newpath\n ${final_location} - DiskLocation\n`
    );
    // Finally upload the file to disk and save the feed to users profile.
    var type = mime.lookup(req.files.filetoupload.name).split("/")[1];
    mv(oldpath, newpath, function (err) {
      console.log("moving files");
    });
    db.findOne({ username: req.session.user }, (err, u) => {
      console.log(u);
      u.posts.push({
        _id: random_id,
        author: req.session.user,
        authorID: req.session._id,
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
        console.log("Post saved");
        // Redirect back after the job is done.
        res.status(204).send();
      });
    });
  }
});

// router.get("/upload", function(req, res, next) {
//   res.send({
//     user: req.session.user
//   });
// });

module.exports = router;
