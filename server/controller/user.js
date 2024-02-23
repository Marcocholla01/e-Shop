const express = require(`express`);
const router = express.Router();
const User = require(`../models/user`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const { upload } = require(`../multer`);
const fs = require(`fs`);
const uuid = require("uuid");
const jwt = require(`jsonwebtoken`);
const sendMail = require(`../utils/sendMail`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middlewares/auth");
const crypto = require("crypto");
const VerificationToken = require("../models/activationToken");
const { generateOTP, generateEmailtemplate } = require("../utils/otp");
const { isValidObjectId } = require("mongoose");

router.post(
  `/create-user`,
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userEmail = await User.findOne({ email });

      if (userEmail) {
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
          .json({ success: false, message: `User already exists ` });
        return next(new ErrorHandler(`User already exists`, 400));
      }

      const fileId = uuid.v4();
      const protocol = req.protocol;
      const host = req.get("host");
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

      const newUser = await User({
        name,
        email,
        avatar: {
          public_id: fileId,
          url: fileUrl,
        },
        password,
      });

      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP,
      });

      await verificationToken.save();

      await sendMail({
        from: "accounts@shop0.com",
        email: newUser.email,
        subject: "Activate Your Account",
        html: generateEmailtemplate(OTP, newUser._id),
      });

      await newUser.save();
      res.status(201).json({
        success: true,
        message: `An Email sent to your account please verify`,
        user: newUser,
      });
      // console.log(newUser);

      // const activationToken = await ActivationToken.create({
      //   userId: newUser._id,
      //   activationToken: crypto.randomBytes(32).toString("hex"),
      // });

      // // Construct the activation URL
      // const activationUrl = `http://localhost:1001/user/${newUser._id}/verify/${activationToken.activationToken}`;

      // try {
      //   await sendMail({
      //     from: "accounts@shop0.com",
      //     email: newUser.email,
      //     subject: "Activate Your Account",
      //     message: `Hello ${newUser.name}, please click on the link to activate your account: ${activationUrl}`,
      //   });
      //   // console.log(message);
      //   // res.status(201).json({
      //   //   success: true,
      //   //   message: `Please check your email: ${newUser.email} to activate your account`,
      //   // });
      // } catch (error) {
      //   return next(new ErrorHandler(error.message, 500));
      // }
      // // You can send a response or do any other necessary actions here.
      // res.status(201).json({
      //   success: true,
      //   message: `An Email sent to your account please verify`,
      //   // user: newUser,
      // });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/verify-user",
  catchAsyncErrors(async (req, res) => {
    try {
      const { userId, otp } = req.body;
      if (!userId || !otp.trim())
        return res.status(400).json({
          success: false,
          message: "otp field are empty",
        });
      if (!userId)
        return res.status(400).json({
          success: false,
          message: "Kindly enter the secret key",
        });

      if (!isValidObjectId(userId))
        return res.status(400).json({
          success: false,
          message: "Invalid secret key",
        });

      const user = await User.findById(userId);
      if (!user)
        return res.status(400).json({
          success: false,
          message: "sorry, user not found",
        });

      if (user.isVerified)
        return res.status(200).json({
          success: true,
          message: "Account already verified!, Kindly login",
        });

      const token = await VerificationToken.findOne({ owner: user._id });
      if (!token)
        return res.status(400).json({
          success: false,
          message: "Invalid Token",
        });

      user.isVerified = true;
      await VerificationToken.findByIdAndDelete(token._id);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Account verified succesfully",
      });
      sendToken(user, 201, res);
    } catch (error) {
      res.status(400).json({
        succes: false,
        message: "Internal Server Error",
      });
    }
  })
);

// // verify user
// router.post(
//   "/verify/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findOne({ _id: req.params.id });

//       if (!user)
//         return res.status(400).json({
//           succes: false,
//           message: "Invalid link",
//         });

//       const activationToken = await ActivationToken.findOne({
//         userId: user._id,
//         activationToken: req.params.activationToken,
//       });

//       if (!activationToken)
//         return res.status(400).json({
//           succes: false,
//           message: "Invalid link",
//         });

//       await User.updateOne({ _id: user._id, isVerified: true });
//       await activationToken.remove();

//       res.status(200).json({
//         succes: true,
//         message: "Email verified succesfully",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
// Login user
router.post(
  `/login-user`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler(`Please provide all the fileds`, 400));
      }
      const user = await User.findOne({ email }).select(`+password`);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found. Please check your credentials.",
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid credentials. Please provide the correct information!!!",
        });
      }
      if (!user.isVerified) {
        const OTP = generateOTP();
        const verificationToken = new VerificationToken({
          owner: newUser._id,
          token: OTP,
        });

        await verificationToken.save();

        await sendMail({
          from: "accounts@shop0.com",
          email: newUser.email,
          subject: "Activate Your Account",
          html: generateEmailtemplate(OTP),
        });

        // await verificationToken.save();

        // await sendMail({
        //   from: "accounts@shop0.com",
        //   email: req.body.email,
        //   subject: "Activate Your Account",
        //   html: generateEmailtemplate(OTP),
        // });

        // try {
        //   await sendMail({
        //     email: user.email,
        //     subject: "Activate Your Account",
        //     message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        //   });
        //   // console.log(message);
        //   // res.status(201).json({
        //   //   success: true,
        //   //   message: `Please check your email: ${newUser.email} to activate your account`,
        //   // });
        // } catch (error) {
        //   return next(new ErrorHandler(error.message, 500));
        // }
        return res.status(404).json({
          success: false,
          message: "Account not verified please check you email to verify.",
        });
      }

      sendToken(user, 201, res);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "server error",
        error,
      });
    }
  })
);

// load user
router.get(`/getuser`, isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler(`User doesn't exists!`));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Logout API
router.get(
  `/logout`,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie(`token`, null, {
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
//   // Generate the activation token
//   const activationToken = createActivationToken(user);

//   // Construct the activation URL
//   const activationUrl = `http://localhost:1001/activation/${activationToken}`;

//   try {
//     await sendMail({
//       email: user.email,
//       subject: "Activate Your Account",
//       message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
//     });
//     res.status(201).json({
//       success: true,
//       message: `Please check your email: ${user.email} to activate your account`,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// } catch (error) {
//   return next(new ErrorHandler(error.message, 500));
// }
// });

// // Define a function to create an activation token
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET, {
//     expiresIn: "5m",
//   });
// };

// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;

//       // Verify the activation token
//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newUser) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }
//       const { name, email, password, avatar } = newUser;

//       let user = await User.findOne({ email });

//       if (user) {
//         return next(new ErrorHandler("User already exists", 400));
//       }
//       user = await User.create({
//         name,
//         email,
//         avatar,
//         password,
//       });

//       // Send the JWT token as a response
//       sendToken(user, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
//);

module.exports = router;
