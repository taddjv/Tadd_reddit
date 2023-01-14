const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  profilePicture: {
    type: String,
  },
  profilePicture: {
    type: String,
  },

  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
  rules: {
    type: Array,
    required: true,
  },
  flairs: {
    type: Array,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Community", communitySchema);
