const mongoose = require("mongoose");
const { type } = require("os");
const { isNumber } = require("util");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name ."],
  },
  description: {
    type: String,
    required: [true, "Please enter product description ."],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price ."],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category ."],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock ."],
    default: 1,
  },
  // numOfReviews: {
  //   type: Number,
  //   default: 0,
  // },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  unit: {
    type: String,
    required: [true, "Please enter the unit of the product."],
    default: "kg",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
