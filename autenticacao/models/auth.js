// app/models/user.js
// load the things we need
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
// define the schema for our user model
var authSchema = mongoose.Schema({
  username: String, // _username_
  password: String, // 123rikwdjbfp2ioeurroasodfj[OJ[Ojsjdfag*wef
  developer: Boolean, // true or false
});

// methods ======================
// generating a hash
authSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
authSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("auth", authSchema);

// create the model for users and expose it to our app
