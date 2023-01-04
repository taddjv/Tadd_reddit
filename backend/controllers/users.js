const User = require("../models/Users");

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
    //? login process
    const hashedPassword = await User.hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    //?^
    res.json(savedUser);
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
    if (User.signup(foundUser, password)) {
      //* create the token
      res.json(foundUser);
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

exports.test = async (req, res) => {
  User.cl("booo");
  res.json("test");
};
