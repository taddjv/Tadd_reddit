const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.statics.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
userSchema.statics.match = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

userSchema.statics.signup = async (foundUser, password) => {
  return (await User.match(password, foundUser.password)) ? user : null;
};

userSchema.statics.cl = (input) => {
  console.log(input);
  console.log(userSchema.statics.gg());
};

module.exports = mongoose.model("User", userSchema);
