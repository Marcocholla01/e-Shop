const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Shop = require("../models/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Please login to continue" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token, please login again" });
    } else if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired, please login again" });
    }

    // Handle other errors
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// seller shop auth
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { shop_token } = req.cookies;

  if (!shop_token) {
    return res.status(401).json({ error: "Please login to continue" });
  }

  try {
    const decoded = jwt.verify(shop_token, process.env.JWT_SECRET_KEY);

    // Check if the user exists
    const shop = await Shop.findById(decoded.id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    req.shop = shop;
    next();
  } catch (error) {
    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token, please login again" });
    } else if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired, please login again" });
    }

    // Handle other errors
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
