require(`dotenv`).config({ path: "config/.env" });
const express = require(`express`);
const router = express.Router();
const catchAsyncErrors = require(`../middlewares/catchAsyncErrors`);
const ErrorHandler = require("../utils/ErrorHandler");

const stripe = require(`stripe`)(process.env.STRIPE_SECRET_KEY);

// STRIPE PAYMENT CONTROLLER
router.post(
  `/process`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: `kes`,
        metadata: {
          company: `Shop0`,
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  `/stripeapikey`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
