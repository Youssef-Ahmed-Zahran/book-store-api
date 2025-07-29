const asyncHandler = require("express-async-handler");

// Http Methods / Verbs

/**
*   @desc   Get Forgot Password View
*   @route  /password/forget-password
*   @method  Get
*   @access  public
*/
module.exports.getForgotPasswordView = asyncHandler((req,res) => {
    res.render("forget-password");
});