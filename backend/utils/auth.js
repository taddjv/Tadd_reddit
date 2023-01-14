const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../models/Users");

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

module.exports = { setTokenCookie };
