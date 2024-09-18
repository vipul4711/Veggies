import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated === undefined) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div className="profileHeader">
              <h1>My Profile</h1>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="dashboardLink">
                  Dashboard
                </Link>
              )}
              <Link to="/me/update" className="editProfileLink">
                Edit Profile
              </Link>
            </div>
            <div className="profileDetails">
              <div className="detailItem">
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div className="detailItem">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div className="detailItem">
                <h4>Mobile Number</h4>
                <p>{user.mobile}</p>
              </div>
            </div>
            <div className="linksSection">
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
