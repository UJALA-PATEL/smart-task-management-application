const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme: { type: String, default: "light" }, // optional for dark mode
  teamId: { type: String, default: null }    // optional for team tasks
});

module.exports = mongoose.model("User", UserSchema);