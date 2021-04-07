const db = require("../utils/user");
var formidable = require("formidable");
var fs = require("file-system");
const { cloudinary, isSetup } = require("../config/cloudinary");
const path = require("path");

module.exports = (req, res, next) => {
  // if (!req.session.user) return res.sendStatus(404);
  if (req.params.mode == "picture") {
    db.findOne({ _id: req.query.id }, (err, user) => {
      if (!user) return res.sendStatus(404);
      var image_types = ["png", "jpeg", "gif", "jpg"];
      var form = new formidable.IncomingForm();

      form.parse(req);

      form.on("fileBegin", function (name, file) {
        if (!image_types.includes(file.name.split(".")[1].toLowerCase())) {
          return res.status(404).send("Unsupported file type!");
        }
        if (
          fs.existsSync(
            path.resolve(
              // "..",
              `public/images/profile_pictures/${user.username}.${
                file.name.split(".")[1]
              }`
            )

            // __dirname.split("/routes")[0] +
            //   "/public/images/profile_pictures/" +
            //   user.username +
            //   "." +
            //   file.name.split(".")[1]
          )
        ) {
          fs.unlinkSync(
            path.resolve(
              // "..",
              `public/images/profile_pictures/${user.username}.${
                file.name.split(".")[1]
              }`
            )

            // __dirname.split("/routes")[0] +
            //   "/public/images/profile_pictures/" +
            //   user.username +
            //   "." +
            //   file.name.split(".")[1]
          );
        }
        file.path = path.resolve(
          // "..",
          `public/images/profile_pictures/${user.username}.${
            file.name.split(".")[1]
          }`
        );

        // __dirname.split("/routes")[0] +
        // "/public/images/profile_pictures/" +
        // user.username +
        // "." +
        // file.name.split(".")[1];
      });
      form.on("file", function (name, file) {
        if (!image_types.includes(file.name.split(".")[1].toLowerCase())) {
          return;
        }
        if (file.name && isSetup) {
          cloudinary.v2.uploader.upload(file.path, function (error, result) {
            console.log(result, error);
            if (!error) {
              user["profile_pic"] = result.url;
              user.save((err, profile) => {
                delete req.session.user;
                req.session.user = profile.username;
                req.session._id = profile._id;
                res.status(200).send(result.url);
              });
            }
          });
          return;
        } else {
          user["profile_pic"] =
            "/images/profile_pictures/" +
            user.username +
            "." +
            file.name.split(".")[1];
          user.save((err, profile) => {
            // delete req.session.user;
            // req.session.user = profile.username;
            // req.session._id = profile._id;
            res
              .status(200)
              .send(
                "/images/profile_pictures/" +
                  user.username +
                  "." +
                  file.name.split(".")[1]
              );
          });
        }
      });
      return;
    });
    return;
  } else {
    db.findOne({ _id: req.body._id }, (err, user) => {
      if (err) return res.end(err);
      if (!user) return res.sendStatus(404);

      user[req.body.key] = req.body.value;
      /*user.save(function(err) {
				if(err) console.error(err);
				return res.sendStatus(200);
			})*/
      user.save((err, profile) => {
        // req.session.user = profile.username;
        // req.session._id = profile._id;
        res.status(200).send("done");
      });
    });
  }
};
