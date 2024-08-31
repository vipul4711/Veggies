const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const router = express.Router();

const { isAuthenticateUser, authorisedRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticateUser, getUserDetails);
router.route("/password/update").put(isAuthenticateUser, updatePassword);
router.route("/me/update").put(isAuthenticateUser, updateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticateUser, authorisedRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticateUser, authorisedRoles("admin"), getSingleUser)
  .put(isAuthenticateUser, authorisedRoles("admin"), updateUserRole)
  .delete(isAuthenticateUser, authorisedRoles("admin"), deleteUser);

module.exports = router;
