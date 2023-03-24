const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

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
  },
  link: {
    type: String,
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  createdAt: {
    type: Date,
    default: randomDate(new Date(2023, 0, 1), new Date()),
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
