const express = require("express");
const {
  createCategory,
  getAdminCategories,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
} = require("../controller/categoryController");
const { isAuthenticateUser, authorisedRoles } = require("../middlewares/auth"); // Import your middleware

const router = express.Router();

// Route to create a new category
router
  .route("/admin/category/new")
  .post(isAuthenticateUser, authorisedRoles("admin"), createCategory);

// Route to get all categories (admin only)
router.route("/admin/categories").get(getAdminCategories);

// Routes to update or delete a specific category by ID
router
  .route("/admin/category/:id")
  .put(isAuthenticateUser, authorisedRoles("admin"), updateCategory)
  .delete(isAuthenticateUser, authorisedRoles("admin"), deleteCategory);

//Get Single Category Details
router.route("/category/:id").get(getCategoryDetails);

module.exports = router;
