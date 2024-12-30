const express = require("express");
const router = express.Router();

const { getTest } = require("../controllers/test.js");

router.route("/test").get(getTest);

module.exports = router;
