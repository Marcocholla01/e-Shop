const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  //   addresses: [
  //     {
  //       country: {
  //         type: String,
  //       },
  //       city: {
  //         type: String,
  //       },
  //       address1: {
  //         type: String,
  //       },
  //       address2: {
  //         type: String,
  //       },
  //       zipCode: {
  //         type: Number,
  //       },
  //       addressType: {
  //         type: String,
  //       },
  //     },
  //   ],
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});
shopSchema.set("timestamps", true);

//  Hash password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
