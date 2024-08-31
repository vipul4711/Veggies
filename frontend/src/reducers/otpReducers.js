import {
  OTP_SEND_FAIL,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
} from "../constants/otpConstant";

export const otpReducer = (state = {}, action) => {
  switch (action.type) {
    case OTP_SEND_REQUEST:
    case OTP_VERIFY_REQUEST:
      return { loading: true };
    case OTP_SEND_SUCCESS:
    case OTP_VERIFY_SUCCESS:
      return { loading: false, success: true, ...action.payload };
    case OTP_SEND_FAIL:
    case OTP_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
