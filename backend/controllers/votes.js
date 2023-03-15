const Vote = require("../models/Votes");
const Post = require("../models/Posts");
exports.getUserVotes = async (req, res) => {
  const { userId } = req.params;
  const votes = await Vote.find({ user: userId });
  res.json(votes);
};

exports.upvotePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req.body;

  const vote = await Vote.findOne({ post: postId, user: user._id });
  if (vote) {
    if (vote.upvote) {
      await vote.delete();
      res.json({ removed: vote._id });
    }
    if (vote.downvote) {
      vote.upvote = true;
      vote.downvote = false;
      await vote.save();
      res.json({ edited: vote });
    }
  } else {
    const newUpvote = new Vote({
      upvote: true,
      downvote: false,
      post: postId,
      user: user._id,
    });
    await newUpvote.save();
    res.json(newUpvote);
  }
};

exports.downvotePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req.body;

  const vote = await Vote.findOne({ post: postId, user: user._id });

  if (vote) {
    if (vote.downvote) {
      await vote.delete();
      res.json({ removed: vote._id });
    }
    if (vote.upvote) {
      vote.downvote = true;
      vote.upvote = false;
      await vote.save();
      res.json({ edited: vote });
    }
  } else {
    const newDownvote = new Vote({
      upvote: false,
      downvote: true,
      post: postId,
      user: user._id,
    });
    await newDownvote.save();
    res.json(newDownvote);
  }
};
