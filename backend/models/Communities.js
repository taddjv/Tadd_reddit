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

  rules: {
    type: Array,
  },
  contentType: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    default: ["#0079d3", "#33a8ff"],
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    allowNull: false,
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Community", communitySchema);
