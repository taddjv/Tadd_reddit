const Community = require("../models/Communities");

exports.getCommunity = async (req, res) => {
  const { name } = req.params;
  const foundCommunity = await Community.findOne({ name });
  res.json(foundCommunity);
};

exports.getCommunities = async (req, res) => {
  const foundCommunities = await Community.find();
  res.json(foundCommunities);
};

exports.createCommunity = async (req, res) => {
  const { name, type } = req.body;
  const { user } = req;
  const newCommunity = new Community({
    name,
    type,
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
  const { type, description, rule } = req.body;
  const { user } = req;
  const { name } = req.params;
  const foundCommunity = await Community.findOne({ name });

  foundCommunity.description = description || foundCommunity.description;
  foundCommunity.type = type || foundCommunity.type;
  if (rule) {
    foundCommunity.rules.push(rule);
  } else {
    foundCommunity.rules = foundCommunity.rules;
  }

  await foundCommunity.save();
  res.json(foundCommunity);
};
