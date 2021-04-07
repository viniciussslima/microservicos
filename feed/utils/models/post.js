// load the things we need

var mongoose = require("mongoose");
// define the schema for our post model
var bcrypt = require("bcrypt-nodejs");

var postSchema = mongoose.Schema({
  username: String,
  posts: Array,
});

// methods ======================
// generating a hash
postSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model("post", postSchema);
