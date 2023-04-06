const communitiesController = require("../../controllers/communities");
const express = require("express");
const router = express.Router();
const { validateCommunityCreate } = require("../../validators/communities");
const { findUser } = require("../../utils/auth");

router.get("/search/:search", communitiesController.searchCommunities);
router.get("/:name", communitiesController.getCommunity);
router.post(
  "/",
  findUser,
  validateCommunityCreate,
  communitiesController.createCommunity
);
router.delete("/:id", findUser, communitiesController.deleteCommunity);
router.patch("/:name", findUser, communitiesController.editCommunity);
router.get("/", communitiesController.getCommunities);

module.exports = router;
