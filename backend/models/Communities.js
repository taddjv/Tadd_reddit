const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  profilePicture: {
    type: String,
  },
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },

  rules: {
    type: Array,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    allowNull: false,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Community", communitySchema);
