const Post = require("../models/Posts");
const Community = require("../models/Communities");
const { callErr } = require("../helper/index");

exports.getAllPosts = async (req, res) => {
  const allPosts = await Post.find()
    .populate("community")
    .populate("author", "username");
  res.json(allPosts);
};
exports.getSubPosts = async (req, res) => {
  const { communityId } = req.params;
  const allPosts = await Post.find({ community: communityId })
    .populate("author", "username")
    .populate("community");
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

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  const foundPost = await Post.findOne({ _id: postId })
    .populate("community")
    .populate("author", "username");
  res.json(foundPost);
};
exports.postSubPost = async (req, res, next) => {
  const { communityId } = req.params;
  const { title, content, type } = req.body;
  const { user } = req;

  const communityPost = await Community.findOne({ _id: communityId });
  let newPost = null;

  switch (type) {
    case "text":
      if (communityPost.contentType.split(",").includes(type)) {
        newPost = new Post({
          title: title,
          type,
          content: content,
          author: user._id,
          community: communityId,
        });
        await newPost.save();
        res.json(newPost);
        return;
      }
    case "image":
      if (!content) return callErr("No Image Url", 401, next);
      if (communityPost.contentType.split(",").includes(type)) {
        newPost = new Post({
          title: title,
          type,
          content: content,
          author: user._id,
          community: communityId,
        });
        await newPost.save();
        res.json(newPost);
        return;
      }
    case "video":
      if (!content) return callErr("No Video Url", 401, next);
      if (communityPost.contentType.split(",").includes(type)) {
        newPost = new Post({
          title: title,
          type,
          content: content,
          author: user._id,
          community: communityId,
        });
        await newPost.save();
        res.json(newPost);
        return;
      }
    case "link":
      if (!content) return callErr("No Link Url", 401, next);
      if (communityPost.contentType.split(",").includes(type)) {
        newPost = new Post({
          title: title,
          type,
          content: content,
          author: user._id,
          community: communityId,
        });
        await newPost.save();
        res.json(newPost);
        return;
      }
  }
};
