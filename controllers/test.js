const Test = require("../models/test");

const getTest = async (req, res) => {
  try {
    const tests = await Test.find();

    return res.status(200).json({
      result: true,
      test: tests,
      message: "Fetched Successfully.",
    });
  } catch (error) {
    console.error("Error fetching tests:", error);

    return res.status(500).json({
      result: false,
      message: "Failed to fetch tests. Please try again later.",
    });
  }
};

module.exports = {
  getTest,
};
