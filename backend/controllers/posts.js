const Post = require("../models/Posts");
const Subscription = require("../models/Subscriptions");
const Community = require("../models/Communities");
const Comment = require("../models/Comments");
const { callErr, sortQuery, votePost } = require("../helper/index");

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
  const allPosts = await Post.find({ community: communityId })
    .populate("author", "username")
    .populate("community")
    .populate("comments")
    .sort(sortQuery(sort));
  // .exec();
  // console.log(allPosts[0]);
  // const comments = await Comment.find({ post: allPosts[0]._id });
  // console.log(comments);

  res.json(allPosts);
};
exports.putUpvote = async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body;
  const post = await Post.findOne({ _id: postId });

  if (status?.removed) {
    post.upVotes--;
  } else if (status?.edited) {
    post.upVotes++;
    post.downVotes--;
  } else {
    post.upVotes++;
  }
  await post.save();

  res.json({ post, voteStatus: votePost(status, "up", "down") });
};

exports.putDownvote = async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body;
  const post = await Post.findOne({ _id: postId });

  if (status?.removed) {
    post.downVotes--;
  } else if (status?.edited) {
    post.upVotes--;
    post.downVotes++;
  } else {
    post.downVotes++;
  }
  await post.save();
  res.json({ post, voteStatus: votePost(status, "down", "up") });
};

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;

  const foundPost = await Post.findOne({ _id: postId })
    .populate("community", ["name", "profilePicture"])
    .populate("author", "username")
    .populate();

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
          createdAt: Date.now(),
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
          createdAt: Date.now(),
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
          createdAt: Date.now(),
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
          createdAt: Date.now(),
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
