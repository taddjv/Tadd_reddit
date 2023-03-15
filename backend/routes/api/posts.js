const postsController = require("../../controllers/posts");
const express = require("express");
const router = express.Router();
const { findUser } = require("../../utils/auth");

router.put("/upvote/:postId", postsController.putUpvote);
router.put("/downvote/:postId", postsController.putDownvote);
router.get("/community/:communityId", postsController.getSubPosts);
router.get("/user/:userId", postsController.getUserPosts);
router.get("/", postsController.getAllPosts);

module.exports = router;
