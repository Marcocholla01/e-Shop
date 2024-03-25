const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const ContactForm = require("../models/contactForm");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

const router = express.Router();

// post complain by the user
router.post(
  `/create-new-form`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      const contactForm = await ContactForm.create({
        name,
        email,
        message,
        subject,
      });
      res.status(200).json({
        succces: true,
        message: `Form submitted successfully`,
      
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Get all contactForm =========ADMIN

router.get(
  `/get-all-forms`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const forms = await ContactForm.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        forms,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
// Get contactform by ID ==========ADMIN
router.get(
  `/get-form/:id`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const form = await ContactForm.findById(id);

      if (!form) {
        return next(new ErrorHandler("Grivances not found with this id", 400));
      }

      res.status(200).json({
        success: true,
        form,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delet form ========Admin
router.delete(
  `/get-form/:id`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const form = await ContactForm.findByIdAndDelete(id);

      if (!form) {
        return next(new ErrorHandler("Grivances not found with this id", 400));
      }
      res.status(200).json({
        success: true,
        message: "",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update form status
router.put(
  `/update-form/:id`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status } = req.body;
      const id = req.pqrqms.id;

      const form = await ContactForm.findById(id);

      if (!form) {
        return next(new ErrorHandler("Grivances not found with this id", 400));
      }

      form.status = status;

      await form.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        message: `Updated successfully`,
        form,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
