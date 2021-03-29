var express = require("express");
var router = express.Router();

const verifyJwt = require("../helpers/verify-jwt");
const rooms = require("./rooms");
const room = require("./room");

router.get("/rooms", verifyJwt, rooms);
router.get("/room/:userid", verifyJwt, room);

module.exports = router;
