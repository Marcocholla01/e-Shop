const express = require("express");
const Event = require("../models/event");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middlewares/auth");
const fs = require(`fs`);
const uuid = require("uuid");

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
        // const files = req.files;
        // const imageUrls = files.map((file) => `${file.filename}`);
        // const eventData = req.body;
        // eventData.images = imageUrls;
        // eventData.shop = shop;

        // const event = await Event.create(eventData);
        // res.status(201).json({
        //   success: true,
        //   event,
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
            filename: file.filename,
          };
        });

        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all events of a shop
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
      const id = req.params.id;

      const event = await Event.findById(id);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: `No event with the specified Id`,
        });
      }
      // Get image filenames from the event
      const imageFilenames = event.images.map((image) => image.filename);

      // Delete each image
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

      await Event.findByIdAndRemove(id);

      res.status(200).json({
        success: true,
        message: `Event deleted Successfully `,
      });

      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events -----Admin
router.get(
  `/admin-all-events`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);
      res.status(200).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete event ----Admin
router.delete(
  `/delete-event/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const event = await Event.findById(id);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: `No event with the specified Id`,
        });
      }
      // Get image filenames from the product
      const imageFilenames = event.images.map((image) => image.filename);

      // Delete each image
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

      await Event.findByIdAndRemove(id);

      res.status(200).json({
        success: true,
        message: `Event deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.put(
  `/eidt-event/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        description,
        discountPrice,
        originalPrice,
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

      const event = await Event.findById(req.params.id);
      // console.log(event);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event with the id not found.",
        });
      }

      event.name = name;
      event.description = description;
      event.category = category;
      event.discountPrice = discountPrice;
      event.originalPrice = originalPrice;
      event.stock = stock;
      event.updatedAt = Date.now();

      await event.save();
      res.status(201).json({
        success: true,
        message: `information updated successfully`,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
