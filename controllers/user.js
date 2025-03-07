const userModel = require("../Models/model");
const bcrypt = require("bcrypt");
const { sendCookie } = require("../utils/features");
const ErrorHandler = require("../middlewares/error");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email }).select("+password");
    if (!user) return next(new Error("Invalid credentials", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("Invalid credentials", 400));

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) return next(new Error("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userModel.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "User registered successfully", 200);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

const updateById = async (req, res) => {};

const deleteById = async (req, res) => {};

module.exports = {
  registerUser,
  updateById,
  deleteById,
  userLogin,
  getMyProfile,
  logout,
};
