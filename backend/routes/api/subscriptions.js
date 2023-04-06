const subscriptionsController = require("../../controllers/subscriptions");
const express = require("express");
const router = express.Router();
// const { validateCommunityCreate } = require("../../validators/communities");
const { findUser } = require("../../utils/auth");

router.get("/user/:userId", findUser, subscriptionsController.getSubUsers);
router.get(
  "/community/:communityId",
  subscriptionsController.getSubCommunities
);
router.post(
  "/community/:communityId",
  findUser,
  subscriptionsController.postSubscription
);
router.delete(
  "/community/:communityId",
  findUser,
  subscriptionsController.deleteSubscription
);

module.exports = router;
