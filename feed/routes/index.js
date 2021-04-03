var express = require("express");
var router = express.Router();

const verifyJwt = require("../helpers/verify-jwt");

const formParser = require("../utils/form-parser");


const root = require("./root");
const category = require("./category");
const post = require("./post");
const upload = require("./upload");
const myPosts = require("./my-posts");
const comment = require("./comment");
const like = require("./like");

router.get("/", verifyJwt, root);
router.get("/myPosts", verifyJwt, myPosts);
router.get("/:category", verifyJwt, category);
router.get("/post/:action/:query", verifyJwt, post);
router.post("/upload", formParser, verifyJwt, upload);
router.post("/comment", verifyJwt, comment);
router.post("/like", verifyJwt, like);

module.exports = router;
