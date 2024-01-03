const express = require(`express`);
const router = express.Router();
const Product = require("../models/Product");
const Shop = require("../models/shop");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const uuid = require("uuid");
const { isSeller } = require("../middlewares/auth");
const fs = require(`fs`);

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
        // const files = req.files;
        // const imageUrls = files.map((file) => `${file.filename}`);
        // const prodactData = req.body;
        // prodactData.images = imageUrls;
        // prodactData.shop = shop;

        // const product = await Product.create(prodactData);
        // res.status(201).json({
        //   success: true,
        //   product,
        // });

        const files = req.files;
        const imageUrls = files.map((file) => {
          const fileId = uuid.v4() + ".png"; // Generate a unique ID for the image
          const protocol = req.protocol;
          const host = req.get("host");
          const fileUrl = `${protocol}://${host}/uploads/${file.filename}`;

          return {
            public_id: fileId,
            url: fileUrl,
          };
        });

        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

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

// Get all Products of a shop
router.get(
  `/all-products-shop/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete product of a shop
router.delete(
  `/delete-shop-product/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      // Delete local images
      // productData.images.forEach(async (image) => {
      //   try {
      //     const filePath = `uploads/${image.url}`;
      //     await fs.unlink(filePath);
      //   } catch (err) {
      //     console.error("Error deleting local image:", err);
      //   }
      // });

      productData.images.forEach((imageUrls) => {
        const filename = imageUrls;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id", 400));
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
