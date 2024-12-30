const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  score: { type: Number, required: true },
  answers: { type: Map, of: String },
  completed_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
