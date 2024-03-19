const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Message = require("../models/message");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAuthenticated, isAdmin } = require("../middlewares/auth");
const { upload } = require("../multer");

const router = express.Router();

// create new message
router.post(
  `/create-new-message`,
  upload.array("images"),
  catchAsyncErrors(async (res, req, next) => {
    try {
      const messageData = req.body;
      const files = req.files;
      if (files) {
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
        messageData.images = imageUrls;
      }
      (messageData.conversationId = req.body.conversationId),
        (messageData.sender = req.body.sender);

      const message = await Message.create({
        conversationId: messageData.conversationId,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(200).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  })
);

module.exports = router;
