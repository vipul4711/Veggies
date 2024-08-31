const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} = require("../controller/productController");
const { isAuthenticateUser, authorisedRoles } = require("../middlewares/auth");

const router = express.Router();

//get all products
router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticateUser, authorisedRoles("admin"), createProduct);

router
  .route("/admin/products")
  .get(isAuthenticateUser, authorisedRoles("admin"), getAdminProducts);

router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, authorisedRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, authorisedRoles("admin"), deleteProduct);

//Get Single Product Details
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticateUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticateUser, deleteProductReviews);

module.exports = router;
