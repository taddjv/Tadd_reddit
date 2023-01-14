const { handleValidationErrors } = require("../utils/validation");
const { check } = require("express-validator");

const validateSignup = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("username")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
};
