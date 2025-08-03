const express = require("express");
const router = express.Router();
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require("../controllers/passwordController");

// password/forget-password
router
  .route("/forget-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

// password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
