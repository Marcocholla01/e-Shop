const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Withdraw = require("../models/withdraw");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middlewares/auth");
const Shop = require("../models/shop");
const sendMail = require("../utils/sendMail");
const { generateEmailtemplate } = require("../utils/otp");
const mongoose = require("mongoose");

const router = express.Router();

//create withdraw request
router.post(
  `/create-withdraw-request/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;
      // console.log(amount);

      const seller = await Shop.findById(req.params.id);

      const data = {
        seller: seller,
        amount,
      };

      try {
        await sendMail({
          // from: "accounts@shop0.com",
          from: process.env.SMTP_MAIL,
          email: seller.email,
          subject: "Withdrawl Request",
          html: amount,
        });

        // res.status(200).json({
        //   success: true,
        // });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }

      const withdraw = await Withdraw.create(data);

      await updateSellersBalance(seller._id, amount);

      async function updateSellersBalance(_id, amount) {
        const seller = await Shop.findById(_id);

        seller.availableBalance = seller.availableBalance - amount;

        await seller.save();
        // console.log(seller);
      }

      res.status(200).json({
        success: true,
        message: `Withdrwal Request sent succesfully !! Kindly check your mail for more information`,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get withdrawal details based on ID
router.get(
  `/withdrawal/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const withdraw = await Withdraw.findById(id);

      if (!withdraw) {
        // If no withdrawal is found with the provided ID, return an error
        return next(new ErrorHandler("Withdrawal not found", 404));
      }

      res.status(200).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all withdrawals -----seller by seller id in Withdrwal document
router.get(
  `/seller-all-withdrawals/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      // Query the Withdraw collection to find all withdrawals by seller ID
      const withdrawals = await Withdraw.find({ "seller._id":id }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        withdrawals,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all withdrawals -----Admin
router.get(
  `/get-admin-all-withdrawals`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraw = await Withdraw.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update withdrawal status ==== Admin
router.put(
  `/update-withdraw-request/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId, status } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: status,
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const transaction = [
        {
          _id: withdraw._id,
          amount: withdraw.amount,
          updatedAt: withdraw.updatedAt,
          status: withdraw.status,
        },
      ];

      const seller = await Shop.findByIdAndUpdate(shopId);

      seller.transactions = transaction;

      await seller.save();
      if (req.body.status === "Suceeded") {
        try {
          await sendMail({
            // from: "accounts@shop0.com",
            from: process.env.SMTP_MAIL,
            email: seller.email,
            subject: "Payment confirmation",
            html: `Your withdrawal request of amount KSHS: ${withdraw.amount}  has been appoved`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 400));
        }

        res.status(200).json({
          success: true,
          message: `Withdrawal Status updated successfully!`,
          withdraw,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete withdraw ----Admin
router.delete(
  `/seller-delete-withdraw/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const withdraw = await Withdraw.findByIdAndDelete(id);
      if (!withdraw) {
        return res.status(404).json({
          success: false,
          message: `No withdraw with the specified Id`,
        });
      }

      res.status(200).json({
        success: true,
        message: `Withdrawal deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
// delete withdraw ----Admin
router.delete(
  `/delete-withdraw/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const withdraw = await Withdraw.findByIdAndDelete(id);
      if (!withdraw) {
        return res.status(404).json({
          success: false,
          message: `No withdraw with the specified Id`,
        });
      }

      res.status(200).json({
        success: true,
        message: `Withdrawal deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
