const mongoose = require(`mongoose`);

const orderSchema = new mongoose.Schema({
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
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "proccessing",
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
