import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { register, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import "./SignUp.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const { name, email, password, mobile } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("mobile", mobile);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Extract redirect path from the query string
  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/account";

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect); // Redirect based on the query parameter
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate]);

  if (loading) return <Loader />;

  return (
    <form
      className="signUpForm"
      encType="multipart/form-data"
      onSubmit={registerSubmit}
    >
      <div className="signUpName">
        <FaceIcon />
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          name="name"
          onChange={registerDataChange}
        />
      </div>
      <div className="signUpEmail">
        <MailOutlineIcon />
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={registerDataChange}
        />
      </div>
      <div className="signUpMobile">
        <PhoneIcon />
        <input
          type="text"
          placeholder="Mobile"
          required
          name="mobile"
          value={mobile}
          onChange={registerDataChange}
        />
      </div>
      <div className="signUpPassword">
        <LockOpenIcon />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={registerDataChange}
        />
      </div>
      <input type="submit" value="Register" className="signUpBtn" />
    </form>
  );
};

export default SignUp;
