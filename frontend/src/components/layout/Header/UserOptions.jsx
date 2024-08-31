import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashBoardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = [
    { icon: <PersonIcon />, name: "Profile", funct: account },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart(${cartItems.length})`,
      funct: cart,
    },
    { icon: <ListAltIcon />, name: "Orders", funct: orders },
    { icon: <ExitAppIcon />, name: "Logout", funct: logoutUser },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <DashBoardIcon />,
      name: "Dashboard",
      funct: dashboard,
    });
  }

  function orders() {
    navigate("/orders");
  }

  function cart() {
    navigate("/cart");
  }

  function account() {
    navigate("/account");
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function logoutUser() {
    dispatch(logout());
    alert("logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.funct}
            tooltipOpen={window.innerWidth <= 575 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
