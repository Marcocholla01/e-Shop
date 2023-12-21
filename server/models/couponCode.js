const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter your CouponCode  name!"],
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
