const usersController = require("../../controllers/users");
const express = require("express");
const router = express.Router();
const { validateLogin, validateSignup } = require("../../validators/users");
const { findUser } = require("../../utils/auth");

router.post("/signup", validateSignup, usersController.postUserSign);
router.post("/login", validateLogin, usersController.postUserLog);
router.delete("/logout", usersController.deleteUserLog);
router.get("/restore", findUser, usersController.getUserLog);
router.get("/", usersController.getAllUsers);

router.get("/test", usersController.test);
module.exports = router;
