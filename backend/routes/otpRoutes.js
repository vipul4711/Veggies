import express from "express";
const { sendOtp, verifyOtp } = require("../controller/otpController");
const { isAuthenticateUser, authorisedRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/otp/send", isAuthenticateUser, sendOtp);
router.post("/otp/verify", isAuthenticateUser, verifyOtp);

export default router;
