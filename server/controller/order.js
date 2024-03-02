const express = require(`express`);
const router = express.Router();
const Order = require(`../models/order`);
// const Product = require(`../models/product`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticated } = require("../middlewares/auth");

//create new order
router.post(
  `/create-order`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop by it's Id
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(200).json({
        success: true,
        orders,
        message: `Order made successfully`,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
