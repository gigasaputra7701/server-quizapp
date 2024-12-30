const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postRegister = wrapAsync(async (req, res) => {
  const { email, username, password } = req.body.user;

  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    return res.status(400).json({
      result: false,
      message: "Email sudah digunakan!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({ email, username, password: hashedPassword });
  await user.save();

  return res.json({
    result: true,
    message: "Berhasil mendaftarkan akun!",
  });
});

const postLogin = wrapAsync(async (req, res) => {
  const { email, password } = req.body.user;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      result: false,
      message: "Email tidak ditemukan!",
    });
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);

  if (!isPasswordEqual) {
    return res.status(400).json({
      result: false,
      message: "Password Salah!",
    });
  }

  const token = await jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    "SECRET"
  );

  return res.json({
    result: true,
    message: "Berhasil Login",
    token: token,
    role: user.role,
  });
});

const getMe = wrapAsync(async (req, res) => {
  const token = req.get("Authorization");

  try {
    const data = await jwt.verify(token, "SECRET");

    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error();
    }

    return res.json({
      result: true,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (e) {
    return res.status(400).json({
      result: false,
      message: "Unauthorized",
    });
  }
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    return res.status(200).json({
      result: true,
      users: users,
      message: "Users fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      result: false,
      message: "Failed to fetch users. Please try again later.",
    });
  }
};

module.exports = {
  postRegister,
  postLogin,
  getMe,
  getAllUsers,
};
