const mongoose = require("mongoose");
const User = require("../models/Users");
const Community = require("../models/Communities");
const Subscription = require("../models/Subscriptions");
const Vote = require("../models/Votes");
require("dotenv").config();

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("database connected");
    else console.log("error with database");
  }
);

const seedDB = async () => {
  await Vote.deleteMany({});
  await Vote.insertMany([
    {
      upvote: true,
      downvote: false,
      post: "6411cc492495259360283dfd",
      user: "6411cc482495259360283de2",
    },
    {
      upvote: true,
      downvote: false,
      post: "6411cc492495259360283dfd",
      user: "6411cc482495259360283de1",
    },
    {
      upvote: false,
      downvote: true,
      post: "6411cc492495259360283dfd",
      user: "6411cc482495259360283de0",
    },
    {
      upvote: true,
      downvote: false,
      post: "6411cc492495259360283dfe",
      user: "6411cc482495259360283de0",
    },
    {
      upvote: true,
      downvote: false,
      post: "6411cc492495259360283dfd",
      user: "6411cc9ecaf07a7a87560d21",
    },
  ]);
};
seedDB().then(() => {
  mongoose.connection.close();
});
