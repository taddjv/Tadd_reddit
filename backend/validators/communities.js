const { handleValidationErrors } = require("../utils/validation");
const { check } = require("express-validator");

const validateCommunityCreate = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("A community is required"),
  check("name")
    .isLength({ max: 21 })
    .withMessage("Username must be between 3 and 20 characters"),
  check("contentType")
    .exists({ checkFalsy: true })
    .withMessage("A community type is required"),
  handleValidationErrors,
];
module.exports = {
  validateCommunityCreate,
};
