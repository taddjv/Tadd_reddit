const Comment = require("../models/Comments");
const { checkSearch, sortQuery, votePost } = require("../helper/index");

exports.getComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findOne({
    _id: commentId,
  });
  res.json(comment);
};

exports.getComments = async (req, res) => {
  const { search } = req.params;
  const { sort } = req.query;

  const comments = await Comment.find(checkSearch(search)).sort(
    sortQuery(sort)
  );
  res.json(comments);
};

exports.getUserComments = async (req, res) => {
  const { userId } = req.params;
  const { sort } = req.query;

  const comments = await Comment.find({ author: userId }).sort(sortQuery(sort));
  res.json(comments);
};

exports.getPostComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId }).populate("author", [
    "profilePicture",
    "username",
  ]);
  res.json(comments);
};

exports.putUpvote = async (req, res) => {
  const { commentId } = req.params;
  const { status } = req.body;
  const comment = await Comment.findOne({ _id: commentId });

  if (status?.removed) {
    comment.upVotes--;
  } else if (status?.edited) {
    comment.upVotes++;
    comment.downVotes--;
  } else {
    comment.upVotes++;
  }
  await comment.save();
  res.json({ comment, voteStatus: votePost(status, "up", "down") });
};

exports.putDownvote = async (req, res) => {
  const { commentId } = req.params;
  const { status } = req.body;
  const comment = await Comment.findOne({ _id: commentId });

  if (status?.removed) {
    comment.downVotes--;
  } else if (status?.edited) {
    comment.downVotes++;
    comment.upVotes--;
  } else {
    comment.downVotes++;
  }
  await comment.save();
  res.json({ comment, voteStatus: votePost(status, "down", "up") });
};

exports.postComment = async (req, res, next) => {
  const { postId } = req.params;
  const { content, type } = req.body;
  const { user } = req;

  const newComment = new Comment({
    content,
    type,
    author: user._id,
    post: postId,
  });
  await newComment.save();
  res.json(newComment);
};

exports.editComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content, type } = req.body;
  const { user } = req;
  const comment = await Comment.findOne({
    _id: commentId,
  }).populate("author", ["profilePicture", "username"]);

  if (!comment) return callErr("Comment not found", 400, next);
  if (comment.author._id.toString() !== user._id.toString())
    return callErr("Not your comment", 403, next);
  comment.content = content;
  await comment.save();
  res.json(comment);
};

exports.deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { user } = req;
  const comment = await Comment.findOne({
    _id: commentId,
  });
  if (!comment) return callErr("Comment not found", 400, next);
  if (comment.author.toString() !== user._id.toString())
    return callErr("Not your comment", 403, next);
  await Comment.deleteOne(comment);
  res.json(comment);
};
