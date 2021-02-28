const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
});

UserSchema.statics.findByCredentials = async (name, password) => {
  console.log(name, password);
  let user = await User.findOne({ name: name });
  if (!user) user = { code: "invalid" };
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) user = { code: "invalid" };
  return user;
};

const User = mongoose.models["User"] || mongoose.model("User", UserSchema);

module.exports = User;
