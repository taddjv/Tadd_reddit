const { handleValidationErrors } = require("../utils/validation");
const { check } = require("express-validator");

const validatePostCreate = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("A title is required"),
  handleValidationErrors,
];
module.exports = {
  validatePostCreate,
};
