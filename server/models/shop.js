const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const defaultAvatarUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1000/uploads/default-profile.avif"
    : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

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
  availableBalance: {
    type: Number,
    default: 0,
  },
  withdrawMethod: {
    type: Object,
  },

  transactions: [
    {
      //   seller: {
      //     type: Object,
      //     required: true,
      //   },

      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "Processing",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  zipCode: {
    type: Number,
    required: true,
  },
  phoneNumber: [{ type: Number }],
  // addresses: [
  //   {
  //     country: {
  //       type: String,
  //     },
  //     city: {
  //       type: String,
  //     },
  //     address1: {
  //       type: String,
  //     },
  //     address2: {
  //       type: String,
  //     },
  //     zipCode: {
  //       type: Number,
  //     },
  //     addressType: {
  //       type: String,
  //     },
  //   },
  // ],
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      default: defaultAvatarUrl,
      // required: true,
    },
    filename: {
      type: String,
    },
  },

  description: {
    type: String,
    // default: "shop description has not been updated",
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
