// load the things we need

var mongoose = require("mongoose");
// define the schema for our post model

var postSchema = mongoose.Schema({
    user:String,
    posts:Array
})


module.exports = mongoose.model('post', postSchema);