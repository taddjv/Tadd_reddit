const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  karma: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
