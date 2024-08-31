import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp } from "../../actions/otpActions";
import Loader from "../layout/Loader/Loader";

const OTPVerifiction = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const otpState = useSelector((state) => state.otp);

  const handleSendOtp = () => {
    dispatch(sendOtp(mobile));
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOtp(mobile, otp));
  };

  return (
    <>
      <h2>OTP Verification</h2>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      {otpState.loading && <Loader />}
      {otpState.error && <p>{otpState.error}</p>}
      {otpState.error && <p>OTP verified</p>}
    </>
  );
};

export default OTPVerifiction;
