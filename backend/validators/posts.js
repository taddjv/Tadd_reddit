const { handleValidationErrors } = require("../utils/validation");
const { check } = require("express-validator");

const validatePostCreate = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("A title is required"),
  // check("content")
  //   .custom((a, b) => {
  //     if (b.req.body.type === "image") {
  //       if (a.endsWith(".jpeg" || ".jpg" || ".png" || ".gif")) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //     return true;
  //   })
  //   .withMessage("Bad image"),
  check("content")
    .custom((a, b) => {
      if (b.req.body.type === "video") {
        // if ([".jpeg", ".jpg", ".png", ".gif"].includes(a.slice(-4))) {
        //   return true;
        // } else {
        //   return false;
        // }
      }
      return true;
    })
    .withMessage("Bad video"),
  check("content")
    .custom((a, b) => {
      if (b.req.body.type === "link") {
        if (a.includes(".com" || ".net" || ".org")) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    })
    .withMessage("Bad Link"),
  handleValidationErrors,
];
module.exports = {
  validatePostCreate,
};
