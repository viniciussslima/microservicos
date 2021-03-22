var express = require("express");
var router = express.Router();

const formParser = require("../utils/form-parser.js");
const user = require("./user");
const users = require("./users");
const newUser = require("./new");
const getin = require("./getin");
const oauth = require("./oauth");
const out = require("./out");

router.get("/user", user);
router.get("/users", users);
router.post("/new", formParser, newUser);
router.post("/getin", formParser, getin);
router.get("/ouath", oauth);
router.get("/out", out);

module.exports = router;
