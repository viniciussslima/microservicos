var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../utils/handlers/user");
var textParser = require("../utils/text-parser");
var formParser = require("../utils/form-parser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.getAll((err, users) => {
    res.send({
      list: users,
    });
  });
});

router.get("/:username", function (req, res, next) {
  db.findOne({ username: req.params.username }, (err, user) => {
    if (!user) return res.status(404).send("No user found");
    user.bio = textParser(user.bio);
    res.send({
      user: user,
      userId: req.session._id,
    });
  });
});

module.exports = router;
