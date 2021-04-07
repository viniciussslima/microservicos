var User = require("../models/user");
var Room = require("../models/room");

module.exports = (req, res) => {
  if (req.user._id == req.params.userid)
    return res.status(400).send({
      message: "Can't chat with yourself...",
    });
  User.findOne({ _id: req.params.userid }).exec((error, user) => {
    if (!user) return res.status(404).send("No user found!");

    Room.find({}).exec((err, rooms) => {
      let room = rooms.find(
        (room) =>
          (room.users[0]._id.toString() === req.user._id.toString() &&
            room.users[1]._id.toString() === user._id.toString()) ||
          (room.users[0]._id.toString() === user._id.toString() &&
            room.users[1]._id.toString() === req.user._id.toString())
      );
      if (room) {
        room.users[0] = req.user;
        room.users[1] = user;

        res.status(200).send({ room });
        req.teste = room;
      } else {
        var newChatRoom = new Room({
          users: [req.user._id, user._id],
          chats: [],
        });
        newChatRoom.save((err, done) => {
          res.send({
            room: {
              users: [req.user, user],
              chats: [],
            },
          });
        });
      }
    });
  });
};
