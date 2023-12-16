const express = require(`express`);
const router = express.Router();
const Product = require("../models/Product");
const Shop = require("../models/shop");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");

// create product Api

router.post(
  `/create-product`,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shopId) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`);
        const prodactData = req.body;
        prodactData.images = imageUrls;
        prodactData.shop = shop;

        const product = await Product.create(prodactData);
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
