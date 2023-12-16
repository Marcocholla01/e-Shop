const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please choose your product category!"],
  },
  tags: {
    type: String,
    required: [true, "Please enter your product tags!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product discount price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock price!"],
  },
  images: [
    {
      type: String,
      required: [true, "Please select at least 3 images"],
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
});

productSchema.set("timestamps", true);

module.exports = mongoose.model("Product", productSchema);
