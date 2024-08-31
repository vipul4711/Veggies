import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ExitAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../../actions/userActions";
import "./Header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const logoutUser = () => {
    dispatch(logout());
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="header">
      <Link to="/" className="header-option">
        <HomeIcon className="header-icon" />
        <span>Home</span>
      </Link>

      <Link to="/orders" className="header-option">
        <ListAltIcon className="header-icon" />
        <span>My Orders</span>
      </Link>

      <Link to="/cart" className="header-option">
        <ShoppingCartIcon className="header-icon" />
        <span>Cart ({cartItems.length})</span>
      </Link>

      {user ? (
        <div className="header-option" onClick={logoutUser}>
          <ExitAppIcon className="header-icon" />
          <span>Logout</span>
        </div>
      ) : (
        <Link to="/account" className="header-option">
          <AccountCircleIcon className="header-icon" />
          <span>Profile</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
