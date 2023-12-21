const mongoose = require("mongoose");

const copounCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    // required: [true, "Please enter your copounCode  name!"],
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
  shop: {
    type: Object,
    required: true,
  },
});

copounCodeSchema.set("timestamps", true);

module.exports = mongoose.model("CupounCode", copounCodeSchema);
