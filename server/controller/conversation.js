const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Conversation = require("../models/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAuthenticated, isAdmin } = require("../middlewares/auth");

const router = express.Router();

// create a new conversation
router.post(
  `/create-new-conversation`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTittle, userId, sellerId } = req.body;

      const isConversationExist = await Conversation.findOne({ groupTittle });
      if (isConversationExist) {
        const conversation = isConversationExist;
        return res.status(200).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTittle: groupTittle,
        });

        res.status(200).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.response.data.message, 500));
    }
  })
);

// get seller conversation
router.get(
  `/get-all-conversation-seller/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversation = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, craetedAt: -1 });

      res.status(200).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.data.message, 500));
    }
  })
);

// get user conversation
router.get(
  `/get-all-conversation-user/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversation = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, craetedAt: -1 });

      res.status(200).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.data.message, 500));
    }
  })
);

// update last message
router.put(
  `/update-last-message/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(id, {
        lastMessage,
        lastMessageId,
      });

      res.status(200).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500)); // Using error.message for error handling
    }
  })
);

module.exports = router;
