const httpRequest = require("request");
const { google } = require("googleapis");

var instagramConf = require("../config/instagram");
var googleConf = require("../config/google");
const oauth2Client = new google.auth.OAuth2(
  googleConf.client_id,
  googleConf.client_secret,
  googleConf.redirect_uri
);

module.exports = async (req, res, next) => {
  if (req.params.service == "instagram") {
    var ig_code = req.query.code;
    console.log(ig_code);
    var options = {
      url: "https://api.instagram.com/oauth/access_token",
      method: "POST",
      form: {
        client_id: instagramConf.client_id,
        client_secret: instagramConf.client_secret,
        grant_type: "authorization_code",
        redirect_uri: instagramConf.redirect_uri,
        code: ig_code,
      },
    };

    httpRequest(options, function (error, response, body) {
      //if (!error && response.statusCode == 200) {
      if (error) res.status(400).send();
      var r = JSON.parse(body);
      console.log(r);
      db.findOne({ username: r.user.username }, (err, exists) => {
        console.log(r);
        if (exists) {
          req.session._id = exists._id;
          req.session.user = exists.username;
          res.status(200).send({
            user: {
              id: exists._id,
              username: exists.username,
            },
          });
        } else {
          var r = JSON.parse(body);
          var newUser = new User({
            id: r.user.id,
            username: r.user.username,
            fistname: r.user.full_name.split(" ")[0],
            lastname: r.user.full_name.split(" ")[
              r.user.full_name.split(" ").length - 1
            ],
            bio: r.user.bio,
            dob: "not set",
            //website: r.user.website,
            profile_pic: r.user.profile_picture,
            password: r.access_token,
            posts: [],
            followers: [],
          });
          console.log(newUser);

          newUser.save((err, cb) => {
            req.session._id = cb._id;
            req.session.user = cb.username;
            res.status(204).send({
              user: {
                id: cb._id,
                username: cb.username,
              },
            });
          });
        }
      });
    });
  }

  if (req.params.service == "google") {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    httpRequest(
      "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
        tokens.access_token,
      function (error, response, body) {
        let user = JSON.parse(response.body);
        console.log(user);
        db.findOne({ username: user.name }, (err, exists) => {
          if (exists) {
            req.session._id = exists._id;
            req.session.user = exists.username;
            res.status(204).send({
              user: {
                id: exists._id,
                username: exists.username,
              },
            });
          } else {
            console.log(user);
            var newUser = new User({
              id: user.sub,
              username: user.name,
              fistname: user.given_name,
              lastname: user.family_name,
              bio: "Hey!", //Is this correct?
              dob: "not set",
              //website: r.user.website,
              profile_pic: user.picture,
              password: tokens.access_token,
              posts: [],
              followers: [],
            });
            console.log(newUser);

            newUser.save((err, cb) => {
              req.session._id = cb._id;
              req.session.user = cb.username;
              res.status(204).send({
                user: {
                  id: cb._id,
                  username: cb.username,
                },
              });
            });
          }
        });
      }
    );
  }
};
