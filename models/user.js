const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: {type: String, required: true},
  role: {
    type: String,
    enum: ["participant", "proctor", "recruiter", "manager"],
    default: "participant",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
