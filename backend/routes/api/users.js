const usersController = require("../../controllers/users");
const express = require("express");
const router = express.Router();
const { validateLogin, validateSignup } = require("../../validators/users");
const { findUser } = require("../../utils/auth");

router.get("/search/:search", usersController.searchUsers);
router.post("/:userId/add-recent", findUser, usersController.addRecent);
router.put("/:userId", findUser, usersController.editUser);
router.post("/signup", validateSignup, usersController.postUserSign);
router.post("/login", validateLogin, usersController.postUserLog);
router.delete("/logout", usersController.deleteUserLog);
router.get("/restore", findUser, usersController.getUserLog);
router.get("/:username", usersController.getUser);
router.get("/", usersController.getAllUsers);

// router.get("/test", usersController.test);
module.exports = router;
