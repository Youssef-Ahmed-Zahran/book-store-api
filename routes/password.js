const express = require("express");
const router = express.Router();
const { getForgotPasswordView } = require("../controllers/passwordController");

// password/forget-password
router.route("/forget-password").get(getForgotPasswordView);

module.exports = router;