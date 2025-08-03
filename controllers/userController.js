const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

// Http Methods / Verbs

/**
 *   @desc   Get All User
 *   @route  /api/users
 *   @method  Get
 *   @access  private (only admin)
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 *   @desc   Get User By Id
 *   @route  /api/users/:id
 *   @method  Get
 *   @access  private (only admin & User himself)
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 *   @desc   Update User By Id
 *   @route  /api/users/:id
 *   @method  Put
 *   @access  private (only admin & User himself)
 */
const updateUserById = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
});

/**
 *   @desc   Delete User By Id
 *   @route  /api/users/:id
 *   @method  Delete
 *   @access  private (only admin & User himself)
 */
const deleteUserById = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
