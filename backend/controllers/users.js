const User = require("../models/Users");
const { setTokenCookie } = require("../utils/auth");
const { callErr } = require("../helper");

//sign up
exports.postUserSign = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({
    username,
  });

  if (foundUser) {
    const err = new Error("User with that username already exists");
    err.username = "User with that username already exists";
    res.status(403);
    err.message = "User already exists";
    res.json({
      message: err.message,
      statusCode: 403,
      errors: err,
    });
  } else {
    const hashedPassword = await User.hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = setTokenCookie(res, newUser);

    res.json(newUser);
  }
};
//Log in
exports.postUserLog = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({
    username: new RegExp(`(${username})`, "i"),
  });

  if (!foundUser) {
    const err = new Error("Username doesn't exist");
    err.username = "Username doesn't exist";
    res.status(403);
    err.message = "User doesn't exist";
    res.json({
      message: err.message,
      statusCode: 403,
      errors: err,
    });
  } else {
    if (User.verifyUser(foundUser, password)) {
      const token = setTokenCookie(res, foundUser);
      res.json(foundUser);
    } else {
      const err = new Error("Invalid credentials");
      err.password = "Invalid credentials";
      res.status(403);
      err.message = "Wrong username or password";
      res.json({
        message: err.message,
        statusCode: 403,
        errors: err,
      });
    }
  }
};

exports.deleteUserLog = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

exports.getUserLog = async (req, res) => {
  const { user } = req;

  if (user) {
    return res.json(user);
  } else return res.json({});
};

exports.getUser = async (req, res) => {
  const { username } = req.params;
  const foundUser = await User.findOne(
    {
      username: { $regex: username, $options: "i" },
    },
    { password: 0, recentCommunities: 0 }
  );
  res.json(foundUser);
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
};
exports.searchUsers = async (req, res) => {
  const { search } = req.params;
  const foundUsers = await User.find({
    username: new RegExp(`(${search})`, "i"),
  });

  res.json(foundUsers);
};
exports.addRecent = async (req, res) => {
  const { user } = req;
  const { profilePicture, name } = req.body;
  let newRecent;
  const foundUser = await User.findOne({ _id: user._id });

  if (foundUser.recentCommunities.includes(`${profilePicture},${name}`))
    return res.json(foundUser);

  newRecent = foundUser.recentCommunities;

  if (foundUser.recentCommunities.length === 3) {
    newRecent.shift();
    newRecent.push(`${profilePicture},${name}`);
  } else {
    newRecent.push(`${profilePicture},${name}`);
  }

  await User.updateOne(
    { _id: user._id },
    {
      recentCommunities: newRecent,
    }
  );

  return res.json(foundUser);
};

exports.editUser = async (req, res, next) => {
  const { userId } = req.params;

  const { profilePicture, username, oldPassword, newPassword } = req.body;
  const foundUser = await User.findOne({ _id: userId });

  if (newPassword) {
    if (User.match(oldPassword, foundUser.password)) {
      foundUser.password = await User.hashPassword(newPassword);
    } else {
      return callErr("Password doesn't match current Password", 401, next);
    }
  }

  foundUser.profilePicture = profilePicture || foundUser.profilePicture;
  foundUser.username = username || foundUser.username;

  await foundUser.save();
  // const foundUser = await User.updateOne(
  //   { _id: userId },
  //   {
  //     profilePicture: profilePicture,
  //   }
  // );
  return res.json(foundUser);
};
