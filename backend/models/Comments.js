const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  upVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  downVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
