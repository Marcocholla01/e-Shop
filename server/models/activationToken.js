const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const verificationTokenSchema = new Schema({
  // Use Schema
  owner: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "User",
    unique: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "Shop",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600, // 1 hour
  },
});

// activationTokenSchema.set("timestamps", true);

//  Hash password
verificationTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }

  this.token = await bcrypt.hash(this.token, 10);
});

// compare password
verificationTokenSchema.methods.comparePassword = async function (token) {
  return await bcrypt.compare(token, this.token);
};

module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
