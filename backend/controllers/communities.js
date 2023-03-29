const Community = require("../models/Communities");

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
  const foundCommunities = await Community.find();
  res.json(foundCommunities);
};

exports.createCommunity = async (req, res) => {
  const { name, contentType } = req.body;
  const { user } = req;
  const newCommunity = new Community({
    name,
    contentType,
    owner: user,
  });
  await newCommunity.save();
  res.json(newCommunity);
};
exports.deleteCommunity = async (req, res) => {
  const { name } = req.params;
  const foundCommunity = await Community.findOne({ name });
  if (!foundCommunity) {
    const err = new Error("Community couldn't be found");
    err.status = 404;
    return next(err);
  }
};
exports.editCommunity = async (req, res) => {
  const { type, description, rule, detail } = req.body;
  const { user } = req;
  const { name } = req.params;
  const foundCommunity = await Community.findOne({ name });

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
    name: new RegExp(`(${search})`, "i"),
  });

  res.json(foundCommunities);
};
