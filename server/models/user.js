const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require(`crypto`);

const defaultAvatarUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1000/uploads/default-avatar.png"
    : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: Number,
  },

  totalEarnings: {
    type: Number,
    default: 0,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
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
  resetPasswordToken: String,
  resetPasswordTime: Date,
});
userSchema.set("timestamps", true);

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Forgot password
// userSchema.methods.getResetToken = function () {
//   // Generating passwordResetToken
//   const resetToken = crypto.randomBytes(40).toString(`hex`);

//   // hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash(`sha256`)
//     .update(resetToken)
//     .digest(`hex`);

//   this.resetPasswordTime = Date.now() + 15 * 60 * 1000; // 15 mins
// };
module.exports = mongoose.model("User", userSchema);
