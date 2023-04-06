const postsController = require("../../controllers/posts");
const express = require("express");
const router = express.Router();
const { validatePostCreate } = require("../../validators/posts");
const { findUser } = require("../../utils/auth");

router.get("/search/:search", postsController.searchPosts);
router.put("/upvote/:postId", findUser, postsController.putUpvote);
router.put("/downvote/:postId", findUser, postsController.putDownvote);
router.get("/community/:communityId", postsController.getSubPosts);
router.post(
  "/community/:communityId",
  findUser,
  validatePostCreate,
  postsController.postSubPost
);
router.get("/user/:userId", postsController.getUserPosts);
router.get("/home", postsController.getHomePosts);
router.get("/all", postsController.getAllPosts);
router.get("/:postId", postsController.getSinglePost);
router.delete("/:postId", findUser, postsController.deletePost);

module.exports = router;
