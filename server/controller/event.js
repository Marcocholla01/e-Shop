const express = require("express");
const Event = require("../models/event");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middlewares/auth");

const router = express.Router();

// create event Api

router.post(
  `/create-event`,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shopId) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);
        res.status(201).json({
          success: true,
          event,
        });

        // const files = req.files;
        // const imageUrls = files.map((file) => {
        //   const fileId = uuid.v4() + ".png"; // Generate a unique ID for the image
        //   const protocol = req.protocol;
        //   const host = req.get("host");
        //   const fileUrl = `${protocol}://${host}/uploads/${file.filename}`;

        //   return {
        //     public_id: fileId,
        //     url: fileUrl,
        //   };
        // });

        // const eventData = req.body;
        // eventData.images = imageUrls;
        // eventData.shop = shop;

        // const event = await Event.create(eventData);

        // res.status(201).json({
        //   success: true,
        //   event,
        // });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all Products of a shop
router.get(
  `/all-events-shop/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete event of a shop
router.delete(
  `/delete-shop-event/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id", 400));
      }
      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
