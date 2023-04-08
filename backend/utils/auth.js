const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const User = require("../models/Users");

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign({ data: user }, secret, {
    expiresIn: parseInt(expiresIn),
  });

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const findUser = (req, res, next) => {
  // const { token } = req.cookies;
  const token = req.headers.authentication;
  req.user = null;

  if (token) {
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        err.status = 403;
        return next(err);
      }
      try {
        const { _id } = jwtPayload.data;
        req.user = await User.findOne({ _id });
      } catch (e) {
        res.clearCookie("token");
        return next();
      }
      if (!req.user) res.clearCookie("token");

      return next();
    });
  } else {
    res.json({
      message: "Authentication required",
      statusCode: 401,
    });
  }
};

module.exports = { setTokenCookie, findUser };
