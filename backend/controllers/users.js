const User = require("../models/Users");
const { setTokenCookie } = require("../utils/auth");

//sign up
exports.postUserSign = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });

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

    res.json({ newUser, token });
  }
};

exports.postUserLog = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });

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
      res.json({ foundUser, token });
    } else {
      const err = new Error("Invalid credentials");
      err.password = "Invalid credentials";
      res.status(403);
      err.message = "Invalid credentials";
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
    return res.json({
      user: user,
    });
  } else return res.json({});
};

exports.test = async (req, res) => {
  const foundUser = await User.find({});
  res.json(foundUser);
};
