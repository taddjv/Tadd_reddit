const commentsController = require("../../controllers/comments");
const express = require("express");
const router = express.Router();
const { findUser } = require("../../utils/auth");

router.get("/search/:search", commentsController.getComments);
router.get("/user/:userId", commentsController.getUserComments);
router.get("/post/:postId", commentsController.getPostComments);
router.get("/:commentId", commentsController.getComment);

router.post("/post/:postId", findUser, commentsController.postComment);

router.put("/upvote/:commentId", findUser, commentsController.putUpvote);
router.put("/downvote/:commentId", findUser, commentsController.putDownvote);
router.put("/:commentId", findUser, commentsController.editComment);

router.delete("/:commentId", findUser, commentsController.deleteComment);

module.exports = router;
