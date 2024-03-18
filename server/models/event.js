const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter your event product name!"],
  },
  description: {
    type: String,
    // required: [true, "Please enter your event product description!"],
  },
  category: {
    type: String,
    // required: [true, "Please choose your event product category!"],
  },
  start_date: {
    type: Date,
    required: true,
  },
  finish_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  tags: {
    type: String,
    // required: [true, "Please enter your event product tags!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    // required: [true, "Please enter your event product discount price!"],
  },
  stock: {
    type: Number,
    // required: [true, "Please enter your event product stock price!"],
  },
  // images: [
  //   {
  //     public_id: String,
  //     url: String,
  //   },
  // ],

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

eventSchema.set("timestamps", true);

module.exports = mongoose.model("Event", eventSchema);
