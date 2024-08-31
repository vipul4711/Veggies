import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginMobile, loginPassword));
  };

  React.useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [dispatch, error, isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <form className="loginForm" onSubmit={loginSubmit}>
      <div className="loginMobile">
        <PhoneIcon />
        <input
          type="text"
          placeholder="Mobile"
          required
          value={loginMobile}
          onChange={(e) => setLoginMobile(e.target.value)}
        />
      </div>
      <div className="loginPassword">
        <LockOpenIcon />
        <input
          type="password"
          placeholder="Password"
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>
      <Link to="/password/forgot">Forgot Password?</Link>
      <input type="submit" value="Login" className="loginBtn" />
    </form>
  );
};

export default Login;
