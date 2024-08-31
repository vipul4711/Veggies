const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsynErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const e = require("express");
const cloudinary = require("cloudinary");

// Create Category -- Admin
exports.createCategory = catchAsynErrors(async (req, res, next) => {
  let imageLink;

  if (typeof req.body.images === "string") {
    // Upload the single image
    const result = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "categories",
    });

    imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  req.body.images = imageLink;
  req.body.user = req.user.id;

  // Create the category with the updated req.body
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

// Get All Categories (Admin)
exports.getAdminCategories = catchAsynErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// Update Category
exports.updateCategory = catchAsynErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  // Handling image update
  let image;

  if (typeof req.body.image === "string") {
    image = req.body.image;
  }

  // If there's a new image provided, delete the old one and upload the new one
  if (image !== undefined) {
    // Destroy the old image in Cloudinary
    await cloudinary.v2.uploader.destroy(category.image.public_id);

    // Upload the new image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "categories",
    });

    req.body.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // Update the category with the new data
  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

// Delete Category
exports.deleteCategory = catchAsynErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  const publicId = category.images.public_id;
  console.log(publicId);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  // Delete the image associated with the category from Cloudinary
  await cloudinary.v2.uploader.destroy(category.images.public_id);

  // Delete the category from the database
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

//Get product Details
exports.getCategoryDetails = catchAsynErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    category,
  });
});
