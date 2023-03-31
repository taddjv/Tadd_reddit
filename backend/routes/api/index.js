const router = require("express").Router();

const usersRouter = require("./users");
const communitiesRouter = require("./communities");
const subscriptionsRouter = require("./subscriptions");
const postsRouter = require("./posts");
const votesRouter = require("./votes");
const commentsRouter = require("./comments");

router.use("/users", usersRouter);
router.use("/communities", communitiesRouter);
router.use("/subscriptions", subscriptionsRouter);
router.use("/posts", postsRouter);
router.use("/votes", votesRouter);
router.use("/comments", commentsRouter);

module.exports = router;
