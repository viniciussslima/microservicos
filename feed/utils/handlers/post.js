var mongoose = require("mongoose");
var Post = require("../models/post");
var bcrypt = require("bcrypt-nodejs");
const a = require("array-tools");
const _ = require("lodash/_arrayIncludes");

mongoose.connect(require("../../config/app").db.connectionUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

function createNew(obj, cb) {
  Post.findOne({ username: obj.username }).exec((err, user) => {
    if (user) {
      return cb(null, false);
    } else {
      var newPost = new Post(obj);
      newPost.save((err, res) => {
        return cb(err, res);
      });
    }
  });
}

function findOne(obj, cb) {
  Post.findOne(obj).exec((err, post) => {
    if (err) return cb(err, false);
    if (post) {
      return cb(err, post);
    } else {
      return cb(null, false);
    }
  });
}

function search(opt, cb) {
  Post.find({ username: { $gt: opt } }).exec((err, results) => {
    if (err) return cb(err, false);
    if (results) {
      return cb(err, results);
    } else {
      return cb(null, false);
    }
  });
}

function findByUsername(username, cb) {
  Post.findOne({ username }).exec((err, posts) => {
    if (err) return cb(err, false);
    if (posts) {
      return cb(null, posts);
    } else {
      return cb(null, false);
    }
  });
}

/*****
  usage:
     getAll((error, result) => {
          if (!result) return false;
          // Do something after...
      })
  *****/

function getAll(cb) {
  Post.find({}).exec((err, posts) => {
    if (err) return cb(err, false);
    if (posts) {
      return cb(null, posts);
    } else {
      return cb(null, false);
    }
  });
}

function deleteOne(opt, cb) {
  //if(typeof opt !== Object) cb("Must be a javascript object.");
  Post.deleteOne(opt).exec((err, res) => {
    if (err) return cb(err, null);
    else if (res.n == 0) {
      return cb(null, true);
    }
  });
}

// Expose all the api...
module.exports = {
  createNew: createNew,
  findOne: findOne,
  getAll: getAll,
  search: search,
  findByUsername,
};
