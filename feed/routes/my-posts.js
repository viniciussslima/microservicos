var db = require("../utils/handlers/post");

module.exports = (req, res, next) => {  
  console.log(req);
  db.findOne({ username: req.user.username }, (err, { posts }) => {    
    res.send({
      posts,
    });
  });
};
