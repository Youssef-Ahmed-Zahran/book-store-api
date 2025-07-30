const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

/**
*   @desc   Send Forgot Password Link
*   @route  /password/forgot-password
*   @method  Post
*   @access  public
*/
module.exports.sendForgotPasswordLink = asyncHandler( async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        res.status(404).json({message: 'User not found'});
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user.id}, secret, {
        expiresIn: "10m"
    });
    
    const link = `http://localhost:8080/password/reset-password/${user._id}/${token}`;

    res.json({message: "Click on this link", resetPasswordLink: link});

    // TODO: send email to user
});

/**
*   @desc   Get Reset Password View
*   @route  /password/reset-password/:userId/:token
*   @method  Get
*   @access  public
*/
module.exports.getResetPasswordView = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        res.status(404).json({message: 'User not found'});
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        jwt.verify(req.params.token, secret);
        res.render("reset-password", {email: user.email});
    } catch (error) {
        console.log(error);
        res.json({message: "Error"});
    }
});

/**
*   @desc   Reset The Password
*   @route  /password/reset-password/:userId/:token
*   @method  Post
*   @access  public
*/
module.exports.resetThePassword = asyncHandler( async (req,res) => {
    // TODO: Validation
    const user = await User.findById(req.params.userId);
    if (!user) {
        res.status(404).json({message: 'User not found'});
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        jwt.verify(req.params.token, secret);

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user.password = req.body.password;

        await user.save();
        res.render("success-password");
    } catch (error) {
        console.log(error);
        res.json({message: "Error"});
    }
});

