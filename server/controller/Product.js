const express = require(`express`);
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const Product = require("../models/Product");
const Shop = require("../models/shop");
const Order = require(`../models/order`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../config/multer");
const { isSeller, isAuthenticated, isAdmin } = require("../middlewares/auth");
const fs = require(`fs`);
const { generateUUID } = require("../utils/helperFunctions");

// create product Api

// Route to create a product
router.post(
  "/create-product",
  // upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    const fileName = generateUUID();
    try {
      const { productImages, shopId, ...otherProductData } = req.body;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      // Handle images array correctly
      let images = [];

      if (productImages && productImages.length > 0) {
        // Map uploaded files to Cloudinary upload promises
        const uploadPromises = productImages.map((base64Image, index) =>
          cloudinary.uploader.upload(base64Image, {
            upload_preset: "ShopO",
            folder: "products",
            public_id: `${fileName}_${index}`,
          })
        );

        // Execute all upload promises concurrently
        const results = await Promise.all(uploadPromises);

        // Extract public_id and secure_url from Cloudinary results
        images = results.map((result, index) => ({
          public_id: result.public_id,
          url: result.secure_url,
          filename: `${fileName}_${index}.png`,
        }));
      }

      // Create new product data with images and shop
      const productData = {
        ...otherProductData,
        images: images,
        shop: shop,
        shopId,
      };

      // Create the product in the database
      const product = await Product.create(productData);

      // Respond with success message and product data
      res.status(201).json({
        success: true,
        product: product,
      });
    } catch (error) {
      // Handle errors
      console.error("Error creating product:", error);
      return next(new ErrorHandler(error.message, 400));
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
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "No product found with the specified ID",
        });
      }

      // Delete images from Cloudinary
      const deletePromises = product.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );

      // Wait for all deletion promises to resolve
      await Promise.all(deletePromises);

      // Get image filenames from the product
      const imageFilenames = product.images.map((image) => image.filename);

      // Delete each local image file (optional, if stored locally)
      for (const filename of imageFilenames) {
        const imagePath = `uploads/${filename}`;
        try {
          // Check if file exists before attempting to delete it
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } catch (error) {
          // Handle errors if any image deletion fails
          console.error(`Error deleting image: ${imagePath}`, error);
        }
      }

      // Delete the product document from the database
      await Product.findByIdAndRemove(productId);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return next(new ErrorHandler(error.message, 400));
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

// get all products -----Admin
router.get(
  `/admin-all-products`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Get a product based on ID
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

// reivew for a product
router.put(
  `/create-new-review`,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { rating, user, comment, productId, orderId, createdAt } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
        createdAt,
      };
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product Already Deleted No Reviews allowed for it",
        });
      }

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: `product reviewed succesfully!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.delete(
  "/delete-product/:productId",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "No product found with the specified ID",
        });
      }

      // Delete images from Cloudinary
      const deletePromises = product.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );

      // Wait for all deletion promises to resolve
      await Promise.all(deletePromises);

      // Get image filenames from the product
      const imageFilenames = product.images.map((image) => image.filename);

      // Delete each local image file (optional, if stored locally)
      for (const filename of imageFilenames) {
        const imagePath = `uploads/${filename}`;
        try {
          // Check if file exists before attempting to delete it
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } catch (error) {
          // Handle errors if any image deletion fails
          console.error(`Error deleting image: ${imagePath}`, error);
        }
      }

      // Delete the product document from the database
      await Product.findByIdAndRemove(productId);

      res.status(200).json({
        success: true,
        message: "Product and associated images deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  `/eidt-product/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        description,
        discountPrice,
        originalPrice,
        tags,
        stock,
        category,
      } = req.body;

      // console.log(
      //   name,
      //   description,
      //   discountPrice,
      //   originalPrice,
      //   tags,
      //   stock,
      //   category
      // );

      const product = await Product.findById(req.params.id);
      // console.log(product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product with the id not found.",
        });
      }

      product.name = name;
      product.description = description;
      product.category = category;
      product.discountPrice = discountPrice;
      product.originalPrice = originalPrice;
      product.tags = tags;
      product.stock = stock;
      product.updatedAt = Date.now();

      await product.save();
      res.status(201).json({
        success: true,
        message: `information updated successfully`,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
