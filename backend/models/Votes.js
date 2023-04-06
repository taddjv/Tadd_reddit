const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  upvote: { type: Boolean, required: true },
  downvote: { type: Boolean, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  comment: { type: Schema.Types.ObjectId, ref: "Comment" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
