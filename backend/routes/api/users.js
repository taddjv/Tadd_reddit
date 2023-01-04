const usersController = require("../../controllers/users");
const express = require("express");
const router = express.Router();
//auth require
// const { User } = require("../../models/User");
// const { check } = require("express-validator");

router.post("/signup", usersController.postUserSign);
router.post("/login", usersController.postUserLog);

router.get("/test", usersController.test);
module.exports = router;
