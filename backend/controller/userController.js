const ErrorHandler = require("../utils/errorHandler");
const catchAsynErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { undefined } = require("webidl-conversions");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register User
exports.registerUser = catchAsynErrors(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is simple Id",
      url: "profileUrl",
    },
    mobile,
  });

  sendToken(user, 200, res);
});

//Login User
exports.loginUser = catchAsynErrors(async (req, res, next) => {
  const { email, password, mobile } = req.body;

  // Check if email or mobile is provided
  if (!email && !mobile) {
    return next(
      new ErrorHandler("Please enter either Email or Mobile number", 400)
    );
  }

  if (!password) {
    return next(new ErrorHandler("Please enter Password", 400));
  }

  // Find user by email or mobile
  let user;
  if (email) {
    user = await User.findOne({ email }).select("+password");
  } else if (mobile) {
    user = await User.findOne({ mobile }).select("+password");
  }

  // Check if user exists
  if (!user) {
    return next(new ErrorHandler("Invalid email/mobile or Password", 401));
  }

  // Compare password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email/mobile or Password", 401));
  }

  // Send JWT token
  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsynErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Looged out",
  });
});

//ForgotPassword
exports.forgotPassword = catchAsynErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is  :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsynErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password token invalide or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  sendToken(user, 200, res);
});

//Get user Details
exports.getUserDetails = catchAsynErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User password
exports.updatePassword = catchAsynErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//Update User Profile
exports.updateUserProfile = catchAsynErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //We will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//Get all Users (Admin)
exports.getAllUsers = catchAsynErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single Users (Admin)
exports.getSingleUser = catchAsynErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User with ${req.params.id} does not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role and Profile
exports.updateUserRole = catchAsynErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User
exports.deleteUser = catchAsynErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
