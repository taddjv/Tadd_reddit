const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
