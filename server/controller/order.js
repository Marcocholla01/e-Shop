const express = require(`express`);
const router = express.Router();
const Product = require(`../models/Product`);
const Order = require(`../models/order`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middlewares/auth");
const Shop = require("../models/shop");
const User = require("../models/user");

//create new order
router.post(
  `/create-order`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        cart,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
        shippingCost,
        subTotalPrice,
        couponDiscount,
      } = req.body;

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
        // Generate a random alphanumeric string of length 4
        const randomAlphanumeric = Math.random().toString(36).substring(2, 6);

        // Generate a random numeric value between 0 and 9999
        const randomNumber = Math.floor(Math.random() * 10000);

        // Combine the random alphanumeric string and the random numeric value
        const invoiceId = randomAlphanumeric + randomNumber;

        // Create the order with the generated invoiceId
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
          subTotalPrice,
          shippingCost,
          couponDiscount,
          invoiceId, // Add invoiceId to the order
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

// Get all orders of user
router.get(
  `/get-all-orders/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.id }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all orders of a shop
router.get(
  `/get-seller-all-orders/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "cart.shopId": req.params.id }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update order status seller
router.put(
  `/update-order-status/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler(`Order not found with this id`, 404));
      }

      if (req.body.status === `Transfered to delivery partner`)
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });

      order.status = req.body.status;

      if (req.body.status === `Delivered`) {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = `Succeeded`;

        const serviceFee = (order.totalPrice * 0.1).toFixed(2);
        await updateAdminInfo(serviceFee);

        order.cart.forEach(async (o) => {
          const serviceFee = (order.totalPrice * 0.1).toFixed(2);
          const amount = order.totalPrice - serviceFee;
          await updateSellerInfo(o.shopId, amount);
        });
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateAdminInfo(serviceFee) {
        const admin = await User.findOne({ role: "Admin" });

        admin.totalEarnings = admin.totalEarnings + parseInt(serviceFee);

        await admin.save();
        // console.log(admin);
      }
      async function updateSellerInfo(shopId, amount) {
        const seller = await Shop.findById(shopId);

        seller.availableBalance += amount;

        await seller.save({ validateBeforeSave: false });
        // console.log(seller);
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

//Give a refund ==== user
router.put(
  `/order-refund/:id`,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler(`Order not found with this id`, 404));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: `Request sent successfully`,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

//accept refund ==== seller
router.put(
  `/order-refund-success/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler(`Order no found with this ID`, 404));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: `order refund successfully`,
      });

      if (req.body.status === `Refund Success`)
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// orders ----Admin
router.get(
  `/admin-all-orders`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete order ----Admin
router.delete(
  `/delete-order/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: `No order with the specified Id`,
        });
      }

      res.status(200).json({
        success: true,
        message: `Order deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get order bassed on OrderID
router.get(
  `/order/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    try {
      const order = await Order.findById(id);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
