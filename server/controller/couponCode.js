const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAuthenticated, isAdmin } = require("../middlewares/auth");
const CouponCode = require("../models/couponCode");
const { upload } = require("../multer");
const uuid = require("uuid");

const router = express.Router();

// create cupouncode Api

router.post(
  `/create-coupon-code`,
  // isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // console.log(req.body);
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      // Check if shopId is valid
      if (!shop) {
        return next(new ErrorHandler("Shop not found", 400));
      }

      const existingCouponCode = await CouponCode.find({
        name: req.body.name,
      });

      if (existingCouponCode.length !== 0) {
        return res
          .status(400)
          .json({ success: false, message: "Coupon code already exists!" });
      }
      const couponCodeData = req.body;
      couponCodeData.shop = shop;

      const couponCode = await CouponCode.create(couponCodeData);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  `/code/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const couponCode = await CouponCode.findById(id);

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all CouponCodes of a shop
router.get(
  `/all-couponCodes-shop/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete couponCode of a shop
router.delete(
  `/delete-shop-couponCode/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodeId = req.params.id;

      const couponCode = await CouponCode.findByIdAndDelete(couponCodeId);

      if (!couponCode) {
        return next(new ErrorHandler("CouponCode not found with this id", 400));
      }
      res.status(200).json({
        success: true,
        message: "CouponCode deleted successfully",
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get coupon cade value by its name
router.get(
  `/get-coupon-value/:name`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        message: `coupon code applied successfully`,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Get all coupon codes ----Admin
router.get(
  `/admin-all-coupon-codes`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// Get all coupon codes
router.get(
  `/all-coupon-codes`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete withdraw ----Admin
router.delete(
  `/delete-coupon-code/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const couponCode = await CouponCode.findByIdAndDelete(id);
      if (!couponCode) {
        return res.status(404).json({
          success: false,
          message: `No coupon code with the specified Id`,
        });
      }

      res.status(200).json({
        success: true,
        message: `Coupon code deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.put(
  `/edit-couponCode/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        imageLink,
        seasson,
        value,
        minAmount,
        maxAmount,
        startDate,
        endDate,
      } = req.body;

      // console.log(
      //   name,
      //   name,
      //   imageLink,
      //   seasson,
      //   value,
      //   minAmount,
      //   maxAmount,
      //   startDate,
      //   endDate,
      // );

      const couponCode = await CouponCode.findById(req.params.id);
      // console.log(couponCode);
      if (!couponCode) {
        return res.status(404).json({
          success: false,
          message: "CouponCode with the id not found.",
        });
      }

      couponCode.name = name;
      couponCode.seasson = seasson;
      couponCode.value = value;
      couponCode.minAmount = minAmount;
      couponCode.maxAmount = maxAmount;
      couponCode.imageLink = imageLink;
      couponCode.startDate = startDate;
      couponCode.endDate = endDate;
      couponCode.updatedAt = Date.now();

      await couponCode.save();
      res.status(201).json({
        success: true,
        message: `information updated successfully`,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
