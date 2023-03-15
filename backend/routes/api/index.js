const router = require("express").Router();

const usersRouter = require("./users");
const communitiesRouter = require("./communities");
const subscriptionsRouter = require("./subscriptions");
const postsRouter = require("./posts");
const votesRouter = require("./votes");

router.use("/users", usersRouter);
router.use("/communities", communitiesRouter);
router.use("/subscriptions", subscriptionsRouter);
router.use("/posts", postsRouter);
router.use("/votes", votesRouter);

module.exports = router;
