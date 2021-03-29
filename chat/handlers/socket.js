const io = require("socket.io");
var User = require("../models/user");
var Room = require("../models/room");

const sio = io({
  cors: {
    origin: process.env.FRONT_URL,
  },
});

function type(socket) {
  User.findOne({ _id: socket.userId }).exec(function (err, u) {
    socket.to(socket.room).emit("typing", { username: u.username });
  });
}

function sendMsg(socket, chat) {
  var time = new Date();
  var room = socket.room;
  if (!room.chats) {
    room.chats = [];
  }
  User.findOne({ _id: socket.userId }).exec(function (err, u) {
    const user = {
      username: u.username,
      profile_pic: u.profile_pic,
      _id: u._id,
    }; //hide stuff like password
    room.chats.push({ txt: chat.txt, by: user, time });
    console.log({ txt: chat.txt, by: user, time });
    room.save((err, obj) => {
      sio.to(socket.room).emit("new msg", {
        txt: chat.txt,
        by: user,
        time,
      });
    });
  });
}

sio.on("connection", function (socket) {
  // Server
  // const handShakeData = socket.request._query['room']

  // Client
  // var socket = io.connect('http://216.157.91.131:8080/', { query: "room=60623f9bf7295e5de943c6b8" });
  const roomId = socket.request._query["room"];
  const userId = socket.request._query["userId"];
  console.log(`User entering room ${roomId}`);

  socket.roomId = roomId;
  socket.userId = userId;

  if (!roomId) return;
  socket.join(roomId);

  Room.findOne({ _id: roomId }, function (err, room) {
    if (!room) {
      return socket.disconnect("unauthorized");
    }
    socket.room = room;
  });
  socket.on("msg", function (data) {
    sendMsg(socket, data);
  });
  socket.on("typing", function (data) {
    type(socket);
  });
});

module.exports = sio;
