const mongoose = require("mongoose");
const Result = require("../models/result");
const User = require("../models/user");

const postResult = async (req, res) => {
  const { user_id, test_id, score, answers, completed_at } = req.body;

  try {
    const user = await User.findById(user_id);

    if (user) {
      user.test_attempt = 0;
      await user.save();
    } else {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }
    const newResult = new Result({
      user_id,
      test_id,
      score,
      answers,
      completed_at,
    });

    await newResult.save();
    res.json(newResult);
  } catch (error) {
    console.error("Gagal submit jawaban:", error);
    res.status(400).json({ message: "Gagal submit jawaban!" });
  }
};

const getAllResult = async (req, res) => {
  try {
    const data = await Result.find()
      .populate({
        path: "user_id",
        select: "username email",
      })
      .populate({
        path: "test_id",
        select: "test_name",
      });

    return res.status(200).json({
      result: true,
      dataResult: data,
      message: "Fetched Successfully.",
    });
  } catch (error) {
    console.error("Error fetching results:", error);

    return res.status(500).json({
      result: false,
      message: "Failed to fetch results",
    });
  }
};

const getResult = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Result.findOne({ user_id: id });

    if (result) {
      return res.status(200).json({
        result: true,
        resultTest: {
          user_id: result.user_id._id,
          score: result.score,
        },
        message: "Result fetched successfully.",
      });
    } else {
      return res.status(404).json({
        result: false,
        message: "No result found for the given user ID.",
      });
    }
  } catch (error) {
    console.log("Error fetching results:", error);

    return res.status(500).json({
      result: false,
      message: "Failed to fetch results",
    });
  }
};

module.exports = {
  postResult,
  getAllResult,
  getResult,
};
