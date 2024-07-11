const express = require(`express`);
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const Shop = require(`../models/shop`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const { upload } = require(`../config/multer`);
const fs = require(`fs`);
const jwt = require(`jsonwebtoken`);
const sendMail = require(`../utils/sendMail`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const { isSeller, isAuthenticated, isAdmin } = require("../middlewares/auth");
const path = require("path");
const { promisify } = require("util");
const {
  generatePasswordresetToken,
  generateEmailtemplate,
} = require("../utils/otp");
const { isValidObjectId } = require("mongoose");
const sendToken = require("../utils/jwtToken");
const { generateUUID } = require("../utils/helperFunctions");
const accessAsync = promisify(fs.access);
const unlinkAsync = promisify(fs.unlink);

// create seller / shop account api
// router.post(
//   `/create-shop`,
//   upload.single("file"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { name, email, password, address, phoneNumber, zipCode } = req.body;
//       const shopEmail = await Shop.findOne({ email });

//       if (shopEmail) {
//         const filename = req.file.filename;
//         const filepath = `uploads/${filename}`;

//         fs.unlink(filepath, (err) => {
//           if (err) {
//             console.log(err);
//             res.status(500).json({ message: `Error deleting file` });
//           }
//         });

//         res
//           .status(201)
//           .json({ success: false, message: `Shop already exists ` });
//         return next(new ErrorHandler(`Shop already exists`, 400));
//       }

//       const fileId = generateUUID();
//       const protocol = req.protocol;
//       const host = req.get("host");
//       const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

//       const newShop = await Shop({
//         name,
//         phoneNumber,
//         email,
//         address,
//         zipCode,
//         avatar: {
//           public_id: fileId,
//           url: fileUrl,
//           filename: req.file.filename,
//         },
//         password,
//       });

//       const OTP = generateOTP();
//       const verificationToken = new VerificationToken({
//         shop: newShop._id,
//         token: OTP,
//       });

//       await verificationToken.save();

//       await sendMail({
//         // from: "accounts@shop0.com",
//         from: process.env.SMTP_MAIL,
//         email: newShop.email,
//         subject: "Activate Your Account",
//         html: generateEmailtemplate(OTP, newShop._id),
//       });

//       await newShop.save();
//       res.status(201).json({
//         success: true,
//         message: `An Email sent to your account please verify`,
//         seller: newShop,
//       });

//       // You can send a response or do any other necessary actions here.
//       // res.status(201).json({
//       //   success: true,
//       //   message: `Account created successfully`,
//       //   shop: newShop,
//       // });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// verify seller
// router.post(
//   "/verify-seller",
//   catchAsyncErrors(async (req, res) => {
//     try {
//       const { sellerId, otp } = req.body;
//       if (!sellerId || !otp.trim())
//         return res.status(400).json({
//           success: false,
//           message: "otp field are empty",
//         });
//       if (!sellerId)
//         return res.status(400).json({
//           success: false,
//           message: "Kindly enter the secret key",
//         });

//       if (!isValidObjectId(sellerId))
//         return res.status(400).json({
//           success: false,
//           message: "Invalid secret key",
//         });

//       const shop = await Shop.findById(sellerId);
//       if (!shop)
//         return res.status(400).json({
//           success: false,
//           message: "sorry, shop not found",
//         });

//       if (shop.isVerified)
//         return res.status(200).json({
//           success: true,
//           message: "Account already verified!, Kindly login",
//         });

//       const token = await VerificationToken.findOne({ shop: shop._id });
//       if (!token)
//         return res.status(400).json({
//           success: false,
//           message: "Invalid Token",
//         });

//       shop.isVerified = true;
//       await VerificationToken.findByIdAndDelete(token._id);
//       await shop.save();

//       res.status(200).json({
//         success: true,
//         message: "Account verified succesfully",
//       });
//       sendToken(shop, 201, res);
//     } catch (error) {
//       res.status(500).json({
//         succes: false,
//         message: error.message,
//       });
//     }
//   })
// );

router.post(
  `/create-shop`,
  // upload.single(`file`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, address, zipCode, avatar } = req.body;
      // return console.log(req.body);
      let { phoneNumber } = req.body;
      const fileName = generateUUID();

      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+254" + phoneNumber.slice(1);
      }
      const shopEmail = await Shop.findOne({ email });

      if (shopEmail) {
        return res
          .status(400)
          .json({ success: false, message: `Shop already exists` });
      }

      // Upload avatar image to Cloudinary
      const myCloud = await cloudinary.uploader.upload(avatar, {
        upload_preset: "ShopO",
        folder: "Shop-Avatars",
        public_id: fileName,
      });

      const shop = {
        name,
        phoneNumber,
        email,
        address,
        zipCode,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
          filename: fileName + ".png",
        },
        password,
      };

      // console.log(shop);

      // Define a function to create an activation token
      const createActivationToken = (shop) => {
        return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
          expiresIn: "30m",
        });
      };

      // Generate the activation token
      const activationToken = createActivationToken(shop);

      // Construct the activation URL
      const activationUrl = `${process.env.FRONTEND_URL}/shop/shop-activation/${activationToken}`;

      // console.log(activationUrl);

      try {
        await sendMail({
          from: process.env.SMTP_MAIL,
          email: shop.email,
          subject: "Activate Your Shop",
          html: generateEmailtemplate(activationUrl),
        });
        res.status(201).json({
          success: true,
          message: `Account verification pending please check your email ${shop.email} to activate your account `,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
      // Other code for sending activation email and creating activation token
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.post(
  "/shop-activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      // Verify the activation token
      const newShop = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newShop) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      // Extract shop details from activation token
      const { name, email, password, address, phoneNumber, avatar, zipCode } =
        newShop;
      const fileId = avatar.public_id;
      const fileUrl = avatar.url;

      // Check if shop already exists
      let shop = await Shop.findOne({ email });
      if (shop) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      // Create the new shop document
      shop = await Shop.create({
        name,
        phoneNumber,
        email,
        address,
        zipCode,
        avatar: {
          public_id: fileId,
          url: fileUrl,
          filename: avatar.filename,
        },
        password,
      });

      // Send the JWT token as a response
      sendToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login seller // shop
router.post(
  `/login-shop`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler(`Please provide all the fileds`, 400));
      }
      const shop = await Shop.findOne({ email }).select(`+password`);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found. Please check your credentials.",
        });
      }
      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid credentials. Please provide the correct information.",
        });
      }

      // if (!shop.isVerified) {
      //   const OTP = generateOTP();
      //   const verificationToken = new VerificationToken({
      //     shop: shop._id,
      //     token: OTP,
      //   });
      //   await verificationToken.save();

      //   await sendMail({
      //     // from: "accounts@shop0.com",
      //     from: process.env.SMTP_MAIL,
      //     email: shop.email,
      //     subject: "Activate Your Account",
      //     html: generateEmailtemplate(OTP, shop._id),
      //   });
      //   return res.status(404).json({
      //     success: false,
      //     errorCode: 600,
      //     message: "Email not verified please check you email to verify.",
      //   });
      // }

      if (!shop.isActive) {
        const message = `Hello ${shop.name} your account is inactive`;
        await sendMail({
          // from: "accounts@shop0.com",
          from: process.env.SMTP_MAIL,
          email: shop.email,
          subject: "Account inactive",
          html: message,
        });
        return res.status(401).json({
          success: false,
          message: "Account Not active wait for ADMIN approval.",
        });
      }

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(`/getshop`, isSeller, async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop.id);
    if (!shop) {
      return next(new ErrorHandler(`Shop doesn't exists!`));
    }

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Logout API
router.get(
  `/logout-seller`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie(`shop_token`, null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "You have successfully loged out",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get Shop Info
router.get(
  `/get-shop-info/:id`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller avatar
router.put(
  "/update-avatar/:id",
  isSeller,
  // upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    const { avatar } = req.body;
    const fileName = generateUUID();
    try {
      const existsShop = await Shop.findById(req.params.id);

      if (!existsShop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }

      // Upload new avatar image to Cloudinary
      const result = await cloudinary.uploader.upload(avatar, {
        upload_preset: "ShopO",
        folder: "Shop-Avatars",
        public_id: fileName,
      });

      // If there's an existing avatar, delete it from Cloudinary
      if (existsShop.avatar.public_id) {
        await cloudinary.uploader.destroy(existsShop.avatar.public_id);
      }

      // Update avatar URL in the database
      existsShop.avatar = {
        public_id: result.public_id,
        filename: fileName + ".png",
        url: result.secure_url,
      };

      // console.log(existsShop.avatar);

      await existsShop.save();

      // Delete local file after upload to Cloudinary
      // fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        seller: existsShop,
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller information
router.put(
  `/update-shop-info/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        address,
        email,
        password,
        name,
        phoneNumber,
        zipCode,
        description,
      } = req.body;

      const shop = await Shop.findById(req.params.id).select(`+password`);
      // console.log(shop);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found. Please check your credentials.",
        });
      }
      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password!!, Kindly input your current password ",
        });
      }
      shop.name = name;
      shop.email = email;
      shop.phoneNumber = phoneNumber;
      shop.address = address;
      shop.zipCode = zipCode;
      shop.description = description;

      await shop.save();
      res.status(201).json({
        success: true,
        message: `information updated successfully`,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller password
router.put(
  "/update-seller-password",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword, email } = req.body;

      // console.log(req.body);

      // Find the seller by ID
      const seller = await Shop.findOne({ email }).select("+password");

      // Check if the seller exists
      if (!seller) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }

      // Validate old password
      const isPasswordValid = await seller.comparePassword(oldPassword);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect",
        });
      }

      // Check if new password matches confirmPassword
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }

      // Update seller's password
      seller.password = newPassword;

      const message = `Hello ${seller.name} your account has been updated successfully  `;
      await sendMail({
        // from: "accounts@shop0.com",
        from: process.env.SMTP_MAIL,
        email: seller.email,
        subject: "shopO Account password updated",
        html: message,
      });

      await seller.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Forgot password
router.post(
  `/password/forgot-password`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const email = req.body.passwordResset;
      // console.log(email);

      const seller = await Shop.findOne({ email: email });

      if (!seller) {
        return res.status(404).json({
          success: false,
          message: `No seller with this email found`,
        });
      }

      try {
        // Get ResetPassword Token
        const resetToken = generatePasswordresetToken();
        // console.log(resetToken);

        await seller.updateOne({
          resetPasswordTime: resetToken.resetPasswordTime,
          resetPasswordToken: resetToken.resetPasswordToken,
        });

        const resetPasswordUrl = `${process.env.FRONTEND_URL}}/seller/password/resset/${resetToken.resetPasswordToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

        await sendMail({
          from: process.env.SMTP_MAIL,
          email: seller.email,
          subject: `shopO Password Recovery`,
          html: message,
        });
        // res.status(201).json({
        //   success: true,
        // });
      } catch (error) {
        seller.resetPasswordToken = undefined;
        seller.resetPasswordTime = undefined;

        await seller.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        message: `An Email sent to ${seller.email} successfully `,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  `/reset-seller-password/:token`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { newPassword, confirmPassword } = req.body;

      // console.log(req.body);

      const resetPasswordToken = req.params.token;

      // console.log(req.params.token);
      const seller = await Shop.findOne({
        resetPasswordToken,
        resetPasswordTime: { $gt: Date.now() },
      });

      if (!seller) {
        sendmailfrom: process.env.SMTP_MAIL,
          res.status(400).json({
            success: false,
            message: `Reset password url invalid or exipred`,
          });
      }
      if (newPassword !== confirmPassword) {
        return next(
          new ErrorHandler(
            `New password and confirm password do not match!`,
            400
          )
        );
      }
      seller.password = newPassword;

      seller.resetPasswordToken = undefined;
      seller.resetPasswordTime = undefined;

      await seller.save();
      const message = `Hello ${seller.name} your account password has been changed  `;
      await sendMail({
        // from: "accounts@shop0.com",
        from: process.env.SMTP_MAIL,
        email: seller.email,
        subject: "shopO Password Reset success",
        html: message,
      });

      res.status(200).json({
        success: true,
        message: `Your password was successfully reseted`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all sellers/shops -----Admin
router.get(
  `/admin-all-sellers`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update seller payment methods ==== sellers
router.put(
  `/update-payment-methods`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod, id } = req.body;

      const seller = await Shop.findByIdAndUpdate(id, {
        withdrawMethod,
      });

      res.status(200).json({
        success: true,
        message: `Withdrawal methods updated successfully!`,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete seller withdrwal methods

router.delete(
  `/delete-withdraw-methods/:id`,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);
      seller.withdrawMethod = null;

      await seller.save();

      res.status(200).json({
        success: true,
        message: `Withdrawal method deleted successfully`,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// activate shop
router.put(
  `/activate-shop/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status } = req.body;
      const id = req.params.id;

      const shop = await Shop.findById(id);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: `No shop with the specified Id`,
        });
      }

      shop.isActive = status;

      const message = `Hello ${shop.name} your account has been activated  `;
      await sendMail({
        // from: "accounts@shop0.com",
        from: process.env.SMTP_MAIL,
        email: shop.email,
        subject: "Account Activation",
        html: message,
      });

      await shop.save();
      res.status(200).json({
        success: true,
        message: `Shop status changed successfully to Active `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// deactivate shop
router.put(
  `/deactivate-shop/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status } = req.body;
      const id = req.params.id;

      const shop = await Shop.findById(id);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: `No shop with the specified Id`,
        });
      }

      shop.isActive = status;

      const message = `Hello ${shop.name} your account has been deactivated  `;
      await sendMail({
        // from: "accounts@shop0.com",
        from: process.env.SMTP_MAIL,
        email: shop.email,
        subject: "Account Deactivation",
        html: message,
      });

      await shop.save();
      res.status(200).json({
        success: true,
        message: `Shop status changed successfully to Inactive `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete shop
router.delete(
  `/delete-shop/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const existsUser = await Shop.findById(id);
      const existsAvatarPath = `uploads/${existsUser.avatar.filename}`;

      // Check if file exists before attempting to unlink it
      try {
        await accessAsync(existsAvatarPath, fs.constants.F_OK);

        // File exists, proceed with deletion
        await unlinkAsync(existsAvatarPath);
        // console.log("File deleted successfully:", existsAvatarPath);
        // res.status(200).json({
        //   success: true,
        //   message: `File deleted successfully: ${existsAvatarPath}`,
        // });
      } catch (error) {
        // File does not exist or cannot be accessed
        // console.log( "File does not exist or cannot be accessed:",existsAvatarPath);

        res.status(400).json({
          success: false,
          message: `File does not exist or cannot be accessed: ${existsAvatarPath}`,
        });
      }

      const shop = await Shop.findByIdAndDelete(id);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: `No shop with the specified Id`,
        });
      }
      const message = `Hello ${shop.name} your account has been deleted  `;
      await sendMail({
        // from: "accounts@shop0.com",
        from: process.env.SMTP_MAIL,
        email: shop.email,
        subject: "Account Activation",
        html: message,
      });

      res.status(200).json({
        success: true,
        message: `Shop deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// find shop information BY USER ID
router.get(`/shop-info/:id`, isAuthenticated, async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;

//
