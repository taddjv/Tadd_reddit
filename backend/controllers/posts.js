const Post = require("../models/Posts");

exports.getAllPosts = async (req, res) => {
  const allPosts = await Post.find()
    .populate("community", "name")
    .populate("author", "username");
  res.json(allPosts);
};
exports.getSubPosts = async (req, res) => {
  const { communityId } = req.params;
  const allPosts = await Post.find({ community: communityId });
  res.json(allPosts);
};
exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const allPosts = await Post.find({ author: userId });
  res.json(allPosts);
};
exports.putUpvote = async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body;
  const post = await Post.findOne({ _id: postId });

  const voteStatus = {
    up: 0,
    down: 0,
  };
  if (status?.removed) {
    post.upVotes--;
    voteStatus["up"]--;
    await post.save();
  } else if (status?.edited) {
    post.upVotes++;
    post.downVotes--;
    voteStatus["up"]++;
    voteStatus["down"]--;
    await post.save();
  } else if (status.statusCode >= 400) {
    return status;
  } else {
    post.upVotes++;
    voteStatus["up"]++;
    await post.save();
  }
  res.json({ post, voteStatus });
};

exports.putDownvote = async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body;
  const post = await Post.findOne({ _id: postId });

  const voteStatus = {
    up: 0,
    down: 0,
  };

  if (status?.removed) {
    post.downVotes--;
    voteStatus["down"]--;
    await post.save();
  } else if (status?.edited) {
    post.upVotes--;
    post.downVotes++;
    voteStatus["up"]--;
    voteStatus["down"]++;
    await post.save();
  } else {
    post.downVotes++;
    voteStatus["down"]++;
    await post.save();
  }
  res.json({ post, voteStatus });
};
