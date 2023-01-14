const mongoose = require("mongoose");
const User = require("../models/Users");
require("dotenv").config();

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("database connected");
    else console.log("error with database");
  }
);

const seedUsers = [
  {
    username: "Batman",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/28/549942/original/batman-photo-u179?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Flash",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/node_img/50/998295/original/flash-comic-book-characters-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "WonderWoman",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/121/2408656/original/wonder-woman-photo-u68?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Superman",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/107/2124152/original/superman-comic-book-characters-photo-u28?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Nightwing",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/43/854440/original/dick-grayson-comic-book-characters-photo-u19?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "GreenLantern",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/57/1121987/original/hal-jordan-comic-book-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "GreenArrow",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/56/1101249/original/green-arrow-u46?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "RedHood",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/64/1272350/original/jason-todd-comic-book-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Robin",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/97/1923725/original/robin-comic-book-series-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Shazam",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/34/669610/original/u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Batgirl",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/node_img/28/540904/original/barbara-gordon-comic-book-characters-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "DoctorFate",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/node_img/44/871198/original/doctor-fate-comic-book-series-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Cyborg",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/136/2717258/original/cyborg-u25?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Aquaman",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/25/482274/original/aquaman-photo-u30?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Raven",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/137/2722677/original/raven-photo-u43?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "JamesGordon",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/node_img/64/1261299/original/james-gordon-comic-book-characters-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "Catwoman",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/35/685950/original/catwoman-comic-book-characters-photo-u19?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
  {
    username: "KidFlash",
    password: "luckyguy11",
    profilePicture:
      "https://imgix.ranker.com/user_node_img/69/1372810/original/kid-flash-comic-book-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
};

seedDB().then(() => {
  mongoose.connection.close();
});
