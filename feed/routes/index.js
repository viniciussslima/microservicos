var express = require("express");
var router = express.Router();

const verifyJwt = require("../helpers/verify-jwt");

const formParser = require("../utils/form-parser");

const root = require("./root");
const category = require("./category");
const post = require("./post");
const upload = require("./upload");
const myPosts = require("./my-posts");

router.get("/", verifyJwt, root);
router.get("/myPosts", verifyJwt, myPosts);
router.get("/:category", verifyJwt, category);
router.get("/post/:action/:query", verifyJwt, post);
router.post("/upload", formParser, verifyJwt, upload);

module.exports = router;
