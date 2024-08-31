import axios from "axios";
import {
  OTP_SEND_FAIL,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
} from "../constants/otpConstant";

export const sendOtp = (mobile) => async (dispatch) => {
  try {
    dispatch({ type: OTP_SEND_REQUEST });
    const { data } = await axios.post("/api/v1/otp/send", { mobile });
    dispatch({ type: OTP_SEND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: OTP_SEND_FAIL, payload: error.response.data.message });
  }
};

export const verifyOtp = (mobile, otp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_VERIFY_REQUEST });
    const { data } = await axios.post("/api/v1/otp/verify", { mobile, otp });
    dispatch({ type: OTP_VERIFY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: OTP_VERIFY_FAIL, payload: error.response.data.message });
  }
};
