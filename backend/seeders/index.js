const mongoose = require("mongoose");
const User = require("../models/Users");

mongoose.connect(
  "mongodb://localhost:27017",
  { userNewUrlParser: true },
  (err) => {
    if (!err) console.log("database connected");
    else console.log("error wu=ith database");
  }
);

const seedUsers = [
  {
    username: "firstUser",
    password: "luckyguy11",
  },
  {
    username: "MrPresident",
    password: "luckyguy11",
  },
  {
    username: "iHaveSomeFriends",
    password: "luckyguy11",
  },
  {
    username: "HeyGuys",
    password: "luckyguy11",
  },
  {
    username: "JohnDoe",
    password: "luckyguy11",
  },
  {
    username: "JaneDoe",
    password: "luckyguy11",
  },
  {
    username: "SomeGuy",
    password: "luckyguy11",
  },
  {
    username: "frenchCanadian",
    password: "luckyguy11",
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
};

seedDB().then(() => {
  mongoose.connection.close();
});
