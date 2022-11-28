const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
  rules: {
    type: Array,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("Community", communitySchema);
