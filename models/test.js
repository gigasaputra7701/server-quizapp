const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_id: { type: Number, required: true },
  question_text: { type: String, required: true },
  options: { type: [String] },
  correct_answer: { type: String, required: true },
  type: { type: String, enum: ["multiple_choice"], required: true },
});

const testSchema = new mongoose.Schema({
  test_name: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Test", testSchema);
