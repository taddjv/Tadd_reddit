const votesController = require("../../controllers/votes");
const express = require("express");
const router = express.Router();
const { findUser } = require("../../utils/auth");

router.get("/user/:userId", findUser, votesController.getUserVotes);

router.post("/post/:postId/upvote", findUser, votesController.upvotePost);
router.post("/post/:postId/downvote", findUser, votesController.downvotePost);
router.post(
  "/comment/:commentId/upvote",
  findUser,
  votesController.upvoteComment
);
router.post(
  "/comment/:commentId/downvote",
  findUser,
  votesController.downvoteComment
);
module.exports = router;
