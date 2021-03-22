var db = require("../utils/handlers/user");
const fs = require("file-system");
const mime = require("mime-types");
var path = require("path");
var mv = require("mv");

module.exports = (req, res, next) => {
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
};
