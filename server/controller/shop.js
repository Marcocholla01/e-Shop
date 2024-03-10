const express = require(`express`);
const router = express.Router();
const Shop = require(`../models/shop`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const { upload } = require(`../multer`);
const fs = require(`fs`);
const uuid = require("uuid");
const jwt = require(`jsonwebtoken`);
const sendMail = require(`../utils/sendMail`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const { isSeller, isAuthenticated, isAdmin } = require("../middlewares/auth");
const path = require("path");
const { promisify } = require("util");
const accessAsync = promisify(fs.access);
const unlinkAsync = promisify(fs.unlink);

// create seller / shop account api
router.post(
  `/create-shop`,
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, address, phoneNumber, zipCode } = req.body;
      const shopEmail = await Shop.findOne({ email });

      if (shopEmail) {
        const filename = req.file.filename;
        const filepath = `uploads/${filename}`;

        fs.unlink(filepath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: `Error deleting file` });
          }
        });

        res
          .status(201)
          .json({ success: false, message: `Shop already exists ` });
        return next(new ErrorHandler(`Shop already exists`, 400));
      }

      const fileId = uuid.v4();
      const protocol = req.protocol;
      const host = req.get("host");
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

      const newShop = await Shop.create({
        name,
        phoneNumber,
        email,
        address,
        zipCode,
        avatar: {
          public_id: fileId,
          url: fileUrl,
          filename: req.file.filename,
        },
        password,
      });
      console.log(newShop);

      // You can send a response or do any other necessary actions here.
      res.status(201).json({
        success: true,
        message: `Account created successfully`,
        shop: newShop,
      });
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

//update shop avatar
router.put(
  `/update-avatar/:id`,
  isSeller,
  upload.single(`image`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsShop = await Shop.findById(req.params.id);
      const existsAvatarPath = `uploads/${existsShop.avatar.filename}`;

      // Check if file exists before attempting to unlink it
      try {
        await accessAsync(existsAvatarPath, fs.constants.F_OK);

        // File exists, proceed with deletion
        await unlinkAsync(existsAvatarPath);
        // console.log("File deleted successfully:", existsAvatarPath);
      } catch (error) {
        // File does not exist or cannot be accessed
        // console.log( "File does not exist or cannot be accessed:",existsAvatarPath);

        res.status(400).json({
          success: false,
          message: `File does not exist or cannot be accessed: ${existsAvatarPath}`,
        });
      }

      // Update avatar URL in the database
      const fileId = uuid.v4();
      const protocol = req.protocol;
      const host = req.get("host");
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      const file = path.join(req.file.filename);
      const seller = await Shop.findByIdAndUpdate(req.params.id, {
        avatar: { public_id: fileId, filename: file, url: fileUrl },
      });

      res.status(200).json({
        success: true,
        message: `Avatar updated successfully`,
        seller,
      });
    } catch (error) {
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
      const { description, password, phoneNumber, name, zipCode, address } =
        req.body;

      const seller = await Shop.findById(req.params.id).select(`+password`);
      // console.log(seller);
      if (!seller) {
        return res.status(404).json({
          success: false,
          message: "Shop not found. Please check your credentials.",
        });
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password!!, Kindly input your current password ",
        });
      }
      seller.name = name;
      seller.description = description;
      seller.address = address;
      seller.zipCode = zipCode;
      seller.phoneNumber = phoneNumber;

      await seller.save();
      res.status(201).json({
        success: true,
        message: `information updated successfully`,
        seller,
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

module.exports = router;

// router.post(
//   `/create-shop`,
//   upload.single(`file`),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { name, email, password, address, phoneNumber, avatar, zipCode } =
//         req.body;
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

//       const fileId = uuid.v4();
//       const protocol = req.protocol;
//       const host = req.get("host");
//       const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

//       const shop = {
//         name,
//         phoneNumber,
//         email,
//         address,
//         zipCode,
//         avatar: {
//           public_id: fileId,
//           url: fileUrl,
//         },
//         password,
//       };

//       //   const newShop = await Shop.create({
//       //     name,
//       //     phoneNumber,
//       //     email,
//       //     address,
//       //     zipCode,
//       //     avatar: {
//       //       public_id: fileId,
//       //       url: fileUrl,
//       //     },
//       //     password,
//       //   });
//       console.log(shop);

//       // Define a function to create an activation token
//       const createActivationToken = (shop) => {
//         return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
//           expiresIn: "5m",
//         });
//       };

//       // Generate the activation token
//       const activationToken = createActivationToken(shop);

//       // Construct the activation URL
//       const activationUrl = `http://localhost:1001/shop/shop-activation/${activationToken}`;

//       console.log(activationUrl);

//       try {
//         await sendMail({
//           email: shop.email,
//           subject: "Activate Your Shop",
//           message: `Hello ${shop.name}, please click on the link to activate your shop: ${activationUrl}`,
//         });
//         res.status(201).json({
//           success: true,
//           message: `Account verification pending please check your email<br/> ${shop.email} <br/> to activate your account `,
//         });
//       } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// router.post(
//   "/shop-activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;

//       // Verify the activation token
//       const newShop = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newShop) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }
//       const { name, email, password, address, phoneNumber, avatar, zipCode } =
//         newShop;

//       let shop = await Shop.findOne({ email });

//       if (shop) {
//         return next(new ErrorHandler("Shop already exists", 400));
//       }
//       shop = await Shop.create({
//         name,
//         phoneNumber,
//         email,
//         address,
//         zipCode,
//         avatar: {
//           public_id: fileId,
//           url: fileUrl,
//         },
//         password,
//       });
//       console.log(shop);
//       // Send the JWT token as a response
//       sendToken(shop, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// module.exports = router;

//
