const mongoose = require(`mongoose`);

const orderSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
  },
  cart: {
    type: Array,
    required: true,
  },

  shippingAddress: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  subTotalPrice: {
    type: Number,
  },
  couponDiscount: {
    type: Number,
  },
  shippingCost: {
    type: Number,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    method: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
    default: Date,
  },
});

orderSchema.set("timestamps", true);

module.exports = mongoose.model("Order", orderSchema);
