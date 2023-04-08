const Community = require("../models/Communities");
const Post = require("../models/Posts");
const { callErr } = require("../helper");

exports.getCommunity = async (req, res) => {
  const { name } = req.params;
  const foundCommunity = await Community
    // .findOne({ name })
    .aggregate([
      { $match: { name } },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "community",
          as: "subs",
        },
      },
      { $addFields: { subCount: { $size: "$subs" } } },
    ]);

  res.json(foundCommunity[0]);
};

exports.getCommunities = async (req, res) => {
  const foundCommunities = await Community.find().limit(5);
  res.json(foundCommunities);
};

exports.createCommunity = async (req, res, next) => {
  const { name, contentType } = req.body;
  const { user } = req;

  const foundCommunity = await Community.findOne({ name: name });
  if (foundCommunity) return callErr("Community already exists", 401, next);

  const newCommunity = new Community({
    name,
    contentType,
    owner: user,
  });
  await newCommunity.save();
  res.json(newCommunity);
};
exports.deleteCommunity = async (req, res) => {
  const { id } = req.params;
  const foundCommunity = await Community.findOne({ _id: id });
  if (!foundCommunity) return callErr("Post not found", 403, next);
  await Community.deleteOne(foundCommunity);
  await Post.deleteMany({ community: id });
  res.json({ message: "deleted" });
};
exports.editCommunity = async (req, res) => {
  const {
    type,
    description,
    rule,
    detail,
    colors,
    contentType,
    profilePicture,
  } = req.body;
  const { user } = req;
  const { name } = req.params;
  const foundCommunity = await Community.findOne({ name });

  foundCommunity.profilePicture =
    profilePicture || foundCommunity.profilePicture;
  foundCommunity.contentType = contentType || foundCommunity.contentType;
  foundCommunity.colors = colors || foundCommunity.colors;
  foundCommunity.description = description || foundCommunity.description;
  foundCommunity.type = type || foundCommunity.type;
  if (rule) {
    foundCommunity.rules.push({ rule, detail });
  } else {
    foundCommunity.rules = foundCommunity.rules;
  }

  await foundCommunity.save();
  res.json(foundCommunity);
};

exports.searchCommunities = async (req, res) => {
  const { search } = req.params;
  const foundCommunities = await Community.find({
    name: { $regex: `${search}`, $options: "i" },
  });
  res.json(foundCommunities);
};
