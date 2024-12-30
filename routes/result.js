const express = require("express");
const router = express.Router();

const { postResult, getResult } = require("../controllers/result.js");

router.route("/result").get(getResult).post(postResult);

module.exports = router;
