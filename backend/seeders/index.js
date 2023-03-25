const { seedCommunities, seedPosts, seedUsers } = require("./data");
const mongoose = require("mongoose");
const User = require("../models/Users");
const Community = require("../models/Communities");
const Subscription = require("../models/Subscriptions");
const Post = require("../models/Posts");
const Subscriptions = require("../models/Subscriptions");
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
  await User.deleteMany({});
  await Community.deleteMany({});
  await Post.deleteMany({});
  await Subscription.deleteMany({});
  await User.insertMany(await seedUsers());
  const allUsers = await User.find({});
  await Community.insertMany(
    seedCommunities.map((comm, i) => {
      return {
        rules: comm.rules,
        type: comm.type,
        name: comm.name.toLowerCase(),
        description: comm.description,
        owner: allUsers[i],
        contentType: comm.contentType,
        profilePicture: comm.profilePicture,
      };
    })
  );

  const allCommunities = await Community.find({});
  // allCommunities.forEach((ele, i) => {
  //   if (i < 3) {
  //     allUsers[0]["subscriptions"].push(ele._id);
  //     ele.subscribers.push(allUsers[0]._id);
  //   }
  // });
  await Subscription.insertMany(
    allCommunities.map((comm, i) => {
      return {
        user: allUsers[i + 1],
        community: comm._id,
        role: "member",
      };
    })
  );

  await Post.insertMany(
    seedPosts.map((ele, i) => {
      return {
        title: ele.title,
        content: ele.content,
        type: ele.type,
        author: allUsers[i],
        community: allCommunities[i || 2],
      };
    })
  );
};

seedDB().then(() => {
  mongoose.connection.close();
});
