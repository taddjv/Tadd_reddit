const Subscription = require("../models/Subscriptions");

exports.getSubUsers = async (req, res) => {
  const { userId } = req.params;
  const foundUsers = await Subscription.find({ user: userId });
  res.json(foundUsers);
};
exports.getSubCommunities = async (req, res) => {
  const { communityId } = req.params;
  const foundCommunities = await Subscription.find({
    community: communityId,
  })
  res.json(foundCommunities);
};

exports.getSubs = async (req, res) => {
  const foundCommunities = await Subscription.find();
  res.json(foundCommunities);
};

exports.postSubscription = async (req, res) => {
  const { user } = req;
  const { communityId } = req.params;
  const { role } = req.body;
  const newSubscription = new Subscription({
    user: user._id,
    community: communityId,
    role,
  });
  await newSubscription.save();
  res.json(newSubscription);
};
exports.deleteSubscription = async (req, res) => {
  const { user } = req;
  const { communityId } = req.params;
  const subscription = await Subscription.findOne({
    user: user._id,
    community: communityId,
  });
  if (!subscription) {
    const err = new Error("Subscription could't be found");
    err.status = 404;
  } else {
    await subscription.delete();
  }

  res.json(subscription.id);
};
