const Result = require("../models/result");

const postResult = async (req, res) => {
  const { user_id, test_id, score, answers, completed_at } = req.body;

  try {
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

const getResult = async (req, res) => {
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
      message: "Failed to fetch results. Please try again later.",
    });
  }
};

module.exports = {
  postResult,
  getResult,
};
