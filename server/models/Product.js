const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    // required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    // required: [true, "Please choose your product category!"],
  },
  tags: [
    {
      type: String,
      // required: [true, "Please enter your product tags!"],
    },
  ],
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    // required: [true, "Please enter your product discount price!"],
  },
  stock: {
    type: Number,
    // required: [true, "Please enter your product stock price!"],
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      filename: {
        type: String,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productid: {
        type: String,
      },
      createdAt: {
        type: Date,
        Default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },

  // images: [
  //   {
  //     type: String,
  //   },
  // ],
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
