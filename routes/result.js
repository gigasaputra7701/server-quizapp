const express = require("express");
const router = express.Router();

const {
  postResult,
  getAllResult,
  getResult,
} = require("../controllers/result.js");

router.route("/result").get(getAllResult).post(postResult);

router.get("/result/:id", getResult);

module.exports = router;
