const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const { isAuthenticateUser, authorisedRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticateUser, newOrder);

router.route("/order/me").get(isAuthenticateUser, myOrders);

router.route("/order/:id").get(isAuthenticateUser, getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthenticateUser, authorisedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticateUser, authorisedRoles("admin"), updateOrder)
  .delete(isAuthenticateUser, authorisedRoles("admin"), deleteOrder);

module.exports = router;
