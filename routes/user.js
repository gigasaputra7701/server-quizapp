const express = require("express");
const router = express.Router();

const {
  postRegister,
  postLogin,
  getMe,
  getAllUsers,
} = require("../controllers/user");

router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/me", getMe);
router.get("/users", getAllUsers);

module.exports = router;
