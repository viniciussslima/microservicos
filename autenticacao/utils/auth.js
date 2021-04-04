var Auth = require("../models/auth");
var bcrypt = require("bcrypt-nodejs");
const _ = require("lodash/_arrayIncludes");

function checkSpace(name) {
  var charSplit = name.split("");
  //console.log(charSplit)
  return _(charSplit, " ");
}
/*****
usage:
	var opt = {
		username:'my_name',
		password:'P@sSW0rD',
		fn:'Divy',
		ln:'Srivastava',
		day:23,
		month:'July',
		year:2004
	}
	createNew(opt, (error, result)=> {
		if(!result) return false;
		// Do some post-save stuff here
	})
*****/
function createNew(obj, cb) {
  if (checkSpace(obj.username)) {
    return cb(null, false);
  } else {
    Auth.findOne({ username: obj.username }).exec((err, user) => {       
      if (user) {
        return cb(null, false);
      } else {        
        var newAuth = new Auth({
          username: obj.username,          
          lastLogin: new Date(),
        });
        newAuth.password = newAuth.generateHash(obj.password);
        newAuth.save((err, res) => {
          return cb(err, res);
        });
      }
    });
  }
}

/*****
usage:
	var opt = {
		username:'my_name',
		password:'P@sSW0rD'
	}
	checkUser(opt, (error, result) => {
		if (!result) return false;
		// Do something after log in...
	})
*****/

function checkUser(obj, cb) {
    Auth.findOne({ username: obj.username }).exec((err, user) => {
    if (err) return cb(err, false);
    if (user) {
      bcrypt.compare(obj.password, user.password, (err, bool) => {
        if (bool) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      });
    } else {
      return cb(null, false);
    }
  });
}

/*****
usage:
    var opt = {
        username:'my_name'
    }
    findOne(opt, (error, result) => {
        if (!result) return false;
        // Do something after finding...
    })
*****/

function findOne(obj, cb) {
    Auth.findOne(obj).exec((err, user) => {
    if (err) return cb(err, false);
    if (user) {
      return cb(err, user);
    } else {
      return cb(null, false);
    }
  });
}

function search(opt, cb) {
    Auth.find({ username: { $gt: opt } }).exec((err, results) => {
    if (err) return cb(err, false);
    if (results) {
      return cb(err, results);
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
    Auth.find({}).exec((err, users) => {
    if (err) return cb(err, false);
    if (users) {
      return cb(null, users);
    } else {
      return cb(null, false);
    }
  });
}

function deleteOne(opt, cb) {
  //if(typeof opt !== Object) cb("Must be a javascript object.");
  Auth.deleteOne(opt).exec((err, res) => {
    if (err) return cb(err, null);
    else if (res.n == 0) {
      return cb(null, true);
    }
  });
}


// Expose all the api...
module.exports = {
  createNew: createNew,
  checkUser: checkUser,
  findOne: findOne,
  getAll: getAll,  
  search: search,
};
