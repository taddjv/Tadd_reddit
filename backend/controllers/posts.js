const Post = require("../models/Posts");
const Subscription = require("../models/Subscriptions");
const Community = require("../models/Communities");
const { callErr } = require("../helper/index");

exports.getAllPosts = async (req, res) => {
  const { sort } = req.query;
  let sortQuery;
  if (sort === "Hot") {
    sortQuery = { upVotes: -1, downVotes: 1 };
  } else if (sort === "New") {
    sortQuery = { createdAt: -1 };
  }
  const allPosts = await Post.find()
    .populate("community")
    .populate("author", "username")
    .sort(sortQuery);
  res.json(allPosts);
};
exports.getSubPosts = async (req, res) => {
  const { communityId } = req.params;
  const { sort } = req.query;

  let sortQuery;
  if (sort === "Hot") {
    sortQuery = { upVotes: -1, downVotes: 1 };
  } else if (sort === "New") {
    sortQuery = { createdAt: -1 };
  }
  const allPosts = await Post.find({ community: communityId })
    .populate("author", "username")
    .populate("community")
    .sort(sortQuery);

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
exports.searchPosts = async (req, res) => {
  const { search } = req.params;
  const foundPosts = await Post.find({
    title: new RegExp(`(${search})`, "i"),
  })
    .populate("community")
    .populate("author", "username");

  res.json(foundPosts);
};
exports.getHomePosts = async (req, res) => {
  const { user } = req;
  const foundCommunities = await Subscription.find({ user: user });
  const allPosts = await Post.find({
    community: { $in: foundCommunities.map((ele) => ele.community.toString()) },
  })
    .populate("community")
    .populate("author", "username");
  if (allPosts.length) {
    res.json(allPosts);
  } else {
    return this.getAllPosts(req, res);
  }
};
exports.getUserPosts = async (req, res) => {
  const { userId, sort } = req.params;
  let sortQuery;
  if (sort === "Hot") {
    sortQuery = { upVotes: -1, downVotes: 1 };
  } else if (sort === "New") {
    sortQuery = { createdAt: -1 };
  }
  const allPosts = await Post.find({ author: userId })
    .populate("community")
    .populate("author", "username")
    .sort(sortQuery);
  res.json(allPosts);
};

exports.deletePost = async (req, res, next) => {
  const { user } = req;
  const { postId } = req.params;
  const post = await Post.findOne({ _id: postId });

  if (!post) return callErr("Post not found", 403, next);

  if (user._id.toString() === post.author.toString()) {
    await Post.deleteOne(post);
    res.json({ message: "deleted" });
  } else {
    return callErr("You do not own this post", 403, next);
  }
};
