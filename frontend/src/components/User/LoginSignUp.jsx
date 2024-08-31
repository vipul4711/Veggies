import React, { useState } from "react";
import "./LoginSignUp.css";
import Login from "./Login";
import SignUp from "./SignUp";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("login");

  const switchTabs = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="LoginSignUpToggle">
            <p
              className={activeTab === "login" ? "active" : ""}
              onClick={() => switchTabs("login")}
            >
              Login
            </p>
            <p
              className={activeTab === "register" ? "active" : ""}
              onClick={() => switchTabs("register")}
            >
              Register
            </p>
          </div>
          <button></button>
        </div>
        {activeTab === "login" ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

export default LoginSignUp;
