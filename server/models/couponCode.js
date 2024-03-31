const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter your CouponCode  name!"],
  },

  seasson: {
    type: String,
  },
  // images: {
  //   public_id: {
  //     type: String,
  //     // required: true,
  //   },
  //   filename: {
  //     type: String,
  //   },
  // },

  imageLink: {
    type: String,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  selectedProduct: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Active",
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
});

couponCodeSchema.set("timestamps", true);

module.exports = mongoose.model("CouponCode", couponCodeSchema);
