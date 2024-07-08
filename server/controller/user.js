const express = require(`express`);
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const User = require(`../models/user`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const { upload } = require(`../config/multer`);
const fs = require(`fs`);
const jwt = require(`jsonwebtoken`);
const sendMail = require(`../utils/sendMail`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin, isSeller } = require("../middlewares/auth");
const crypto = require("crypto");
const VerificationToken = require("../models/activationToken");
// import { generateFromEmail, generateUsername } from "unique-username-generator";
const {
  generateOTP,
  generateEmailtemplate,
  generatePasswordresetToken,
  generateRandomPassword,
} = require("../utils/otp");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const { promisify } = require("util");
const { generateUUID } = require("../utils/helperFunctions");
const accessAsync = promisify(fs.access);
const unlinkAsync = promisify(fs.unlink);

//create user
// router.post(
//   `/create-user`,
//   upload.single("file"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { name, email, password } = req.body;
//       const userEmail = await User.findOne({ email });

//       if (userEmail) {
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
//           .json({ success: false, message: `User already exists ` });
//         return next(new ErrorHandler(`User already exists`, 400));
//       }

//       const fileId = generateUUID();
//       const protocol = req.protocol;
//       const host = req.get("host");
//       const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

//       const newUser = await User({
//         name,
//         email,
//         avatar: {
//           public_id: fileId,
//           url: fileUrl,
//           filename: req.file.filename,
//         },
//         password,
//       });

//       const OTP = generateOTP();
//       const verificationToken = new VerificationToken({
//         owner: newUser._id,
//         token: OTP,
//       });

//       await verificationToken.save();

//       await sendMail({
//         // from: "accounts@user0.com",
//         from: process.env.SMTP_MAIL,
//         email: newUser.email,
//         subject: "Activate Your Account",
//         html: generateEmailtemplate(OTP, newUser._id),
//       });

//       await newUser.save();
//       res.status(201).json({
//         success: true,
//         message: `An Email sent to your account please verify`,
//         user: newUser,
//       });
// console.log(newUser);

//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// router.post(
//   "/verify-user",
//   catchAsyncErrors(async (req, res) => {
//     try {
//       const { userId, otp } = req.body;
//       if (!userId || !otp.trim())
//         return res.status(400).json({
//           success: false,
//           message: "otp field are empty",
//         });
//       if (!userId)
//         return res.status(400).json({
//           success: false,
//           message: "Kindly enter the secret key",
//         });

//       if (!isValidObjectId(userId))
//         return res.status(400).json({
//           success: false,
//           message: "Invalid secret key",
//         });

//       const user = await User.findById(userId);
//       if (!user)
//         return res.status(400).json({
//           success: false,
//           message: "sorry, user not found",
//         });

//       if (user.isVerified)
//         return res.status(200).json({
//           success: true,
//           message: "Account already verified!, Kindly login",
//         });

//       const token = await VerificationToken.findOne({ owner: user._id });
//       if (!token)
//         return res.status(400).json({
//           success: false,
//           message: "Invalid Token",
//         });

//       user.isVerified = true;
//       await VerificationToken.findByIdAndDelete(token._id);
//       await user.save();

//       res.status(200).json({
//         success: true,
//         message: "Account verified succesfully",
//       });
//       sendToken(user, 201, res);
//     } catch (error) {
//       res.status(400).json({
//         succes: false,
//         message: "Internal Server Error",
//       });
//     }
//   })
// );

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

router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Check if user with the same email already exists
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        const filepath = `uploads/${req.file.filename}`;
        fs.unlink(filepath, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: `Error deleting file` });
          }
        });

        return res
          .status(400)
          .json({ success: false, message: `User already exists` });
      }

      // Upload avatar image to Cloudinary
      const myCloud = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "ShopO",
        folder: "avatars",
      });

      // Create the user object with Cloudinary details
      const user = {
        name,
        email,
        password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      };

      // Save the user to the database (if needed)
      // await user.save();

      // Define a function to create an activation token
      const createActivationToken = (user) => {
        return jwt.sign(user, process.env.ACTIVATION_SECRET, {
          expiresIn: "30m",
        });
      };

      // Generate the activation token
      const activationToken = createActivationToken(user);

      // Construct the activation URL
      const activationUrl = `${process.env.FRONTEND_URL}/user/user-activation/${activationToken}`;

      // Send activation email
      await sendMail({
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Activate Your User",
        html: generateEmailtemplate(activationUrl),
      });

      // Respond with success message
      res.status(201).json({
        success: true,
        message: `Account verification pending. Please check your email ${user.email} to activate your account.`,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, error.http_code || 500));
    }
  })
);

// router.post(
//   `/create-user`,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { name, email, password, file } = req.body;
//       let { phoneNumber } = req.body;
//       console.log(req.body.name);

//       // if (phoneNumber.startsWith("0")) {
//       //   phoneNumber = "+254" + phoneNumber.slice(1);
//       // } else if (phoneNumber.startsWith("254")) {
//       //   phoneNumber = "+" + phoneNumber;
//       // }

//       const userEmail = await User.findOne({ email });

//       if (userEmail) {
//         return next(new ErrorHandler("User already exists", 400));
//       }

//       // Upload avatar image to Cloudinary
//       const myCloud = await cloudinary.uploader.upload(file, {
//         upload_preset: "ShopO",
//         folder: "avatars",
//       });

//       // Create the user object with Cloudinary details
//       const user = new User({
//         name,
//         email,
//         password,
//         phoneNumber,
//         avatar: {
//           public_id: myCloud.public_id,
//           url: myCloud.secure_url,
//         },
//       });

//       // Save the user to the database
//       // await user.save();

//       // Generate the activation token
//       const activationToken = await createActivationToken(user);

//       // Construct the activation URL
//       const activationUrl = `${process.env.FRONTEND_URL}/user/user-activation/${activationToken}`;

//       // Send activation email
//       await sendMail({
//         from: process.env.SMTP_MAIL,
//         email: user.email,
//         subject: "Activate Your User",
//         html: generateEmailtemplate(activationUrl),
//       });

//       // Respond with success message
//       res.status(201).json({
//         success: true,
//         message: `Account verification pending. Please check your email ${user.email} to activate your account.`,
//       });
//     } catch (error) {
//       console.log(error);
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

router.post(
  "/user-activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      // Verify the activation token
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      // Extract user details from activation token
      const { name, email, password, address, avatar } = newUser;
      const fileId = avatar.public_id;
      const fileUrl = avatar.url;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // Create the new user document
      user = await User.create({
        name,
        email,
        address,
        avatar: {
          public_id: fileId,
          url: fileUrl,
          filename: avatar.filename,
        },
        password,
      });

      // Send the JWT token as a response
      sendToken(user, 201, res);
    } catch (error) {
      console.log(error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Google Oauth API
router.post(
  `/google`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, photo } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Send token for existing user
        sendToken(existingUser, 200, res);
      } else {
        // Generate a random password that complies with the specified password requirements
        const generatedPassword = generateRandomPassword();

        // Create the new user
        const fileId = generateUUID();
        const newUser = new User({
          name,
          email,
          avatar: {
            public_id: fileId,
            url: photo,
            filename: null,
          },
          password: generatedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Send an email to the user containing the auto-generated password

        sendMail({
          from: process.env.SMTP_MAIL,
          email: email,
          subject: "Your Auto-Generated Password",
          html: `Dear ${name},<br><br>Your auto-generated password is: <strong>${generatedPassword}</strong>.<br>You may use this password to log in with email and password.`,
        });

        // Send token for new user
        sendToken(newUser, 201, res);
      }
    } catch (error) {
      console.error("Error during Google OAuth:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Facebook Oauth API
router.post(
  `/facebook`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, photo } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Send token for existing user
        sendToken(existingUser, 200, res);
      } else {
        // Generate a random password that complies with the specified password requirements
        const generatedPassword = generateRandomPassword();

        // Create the new user
        const fileId = generateUUID();
        const newUser = new User({
          name,
          email,
          avatar: {
            public_id: fileId,
            url: photo,
            // filename: null,
          },
          password: generatedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Send an email to the user containing the auto-generated password

        sendMail({
          from: process.env.SMTP_MAIL,
          email: email,
          subject: "Your Auto-Generated Password",
          html: `Dear ${name},<br><br>Your auto-generated password is: <strong>${generatedPassword}</strong>.<br>You may use this password to log in with email and password.`,
        });

        // Send token for new user
        sendToken(newUser, 201, res);
      }
    } catch (error) {
      console.error("Error during Facebook OAuth:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

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

      if (!user.isActive) {
        const message = `Hello ${user.name} your account was deactivated kindly contact us via our support page`;

        await sendMail({
          // from: "accounts@user0.com",
          from: process.env.SMTP_MAIL,
          email: user.email,
          subject: "Inactive account",
          html: message,
        });

        return res.status(401).json({
          success: false,
          message: "Your account is Inactive",
        });
      }

      sendToken(user, 201, res);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
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

// Forgot password
router.post(
  `/password/forgot-password`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const email = req.body.passwordResset;
      // console.log(email);

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with this email found`,
        });
      }

      try {
        // Get ResetPassword Token
        const resetToken = generatePasswordresetToken();
        // console.log(resetToken);

        await user.updateOne({
          resetPasswordTime: resetToken.resetPasswordTime,
          resetPasswordToken: resetToken.resetPasswordToken,
        });

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/resset/${resetToken.resetPasswordToken}`;
        // const resetPasswordUrl = `${(req, protocol)}://${req.get(
        //   `host`
        // )}/password/resset/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

        await sendMail({
          from: process.env.SMTP_MAIL,
          email: user.email,
          subject: `user Password Recovery`,
          html: message,
        });
        // res.status(201).json({
        //   success: true,
        // });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTime = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        message: `An Email sent to ${user.email} successfully `,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  `/reset-user-password/:token`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { newPassword, confirmPassword } = req.body;

      // console.log(req.body);

      const resetPasswordToken = req.params.token;

      // console.log(req.params.token);
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTime: { $gt: Date.now() },
      });

      if (!user) {
        return next(new ErrorHandler(`Reset password url invalid or exipred `));
      }
      if (newPassword !== confirmPassword) {
        return next(
          new ErrorHandler(
            `New password and confirm password do not match!`,
            400
          )
        );
      }
      user.password = newPassword;

      user.resetPasswordToken = undefined;
      user.resetPasswordTime = undefined;

      const message = `Hello ${user.name} your account password has been reseted successfully  `;
      await sendMail({
        // from: "accounts@user0.com",
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Accout password reset",
        html: message,
      });

      await user.save();

      res.status(200).json({
        success: true,
        message: `Your password was successfully reseted`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user informatio
router.put(
  `/update-user-info`,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      let { phoneNumber } = req.body;

      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+254" + phoneNumber.slice(1);
      }

      const user = await User.findById(req.user.id).select(`+password`);
      // console.log(user);
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
          message: "Invalid password!!, Kindly input your current password ",
        });
      }
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();
      res.status(201).json({
        success: true,
        message: `information updated successfully`,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user avatar
router.put(
  `/update-avatar`,
  isAuthenticated,
  upload.single(`image`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);
      console.log(existsUser);

      if (!existsUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Upload new avatar image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "ShopO",
        folder: "avatars",
      });

      // If there's an existing avatar, delete it from Cloudinary
      if (existsUser.avatar.public_id) {
        await cloudinary.uploader.destroy(existsUser.avatar.public_id);
      }

      // Update avatar URL in the database
      existsUser.avatar = {
        public_id: result.public_id,
        filename: req.file.filename,
        url: result.secure_url,
      };

      console.log(existsUser.avatar);

      await existsUser.save();

      // Delete local file after upload to Cloudinary
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        seller: existsUser,
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user adressess

router.put(
  `/update-user-addresses`,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return res.status(400).json({
          success: false,
          message: `${req.body.addressType} address already exists`,
        });
      }
      const existsAdress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAdress) {
        Object.assign(existsAdress, req.body);
      } else {
        // add the new address
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: `Address successfully saved`,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  `/delete-user-address/:id`,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({
        success: true,
        message: `Adress deleted successfully`,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword, email } = req.body;

      // console.log(req.body);

      // Find the user by ID
      const user = await User.findOne({ email }).select("+password");

      // Check if the user exists
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Validate old password
      const isPasswordValid = await user.comparePassword(oldPassword);
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

      // Update user's password
      user.password = newPassword;

      const message = `Hello ${user.name} your account has been activated  `;
      await sendMail({
        // from: "accounts@user0.com",
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Password updated",
        html: message,
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all users -----Admin
router.get(
  `/admin-all-users`,
  isAuthenticated,
  isAdmin(`Admin`),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update or change user role
router.put(
  `/update-user-role/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { newRole } = req.body;
      const id = req.params.id;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with the specified Id`,
        });
      }

      user.role = newRole;

      const message = `Hello ${user.name} your account role has changed to ${newRole}  `;
      await sendMail({
        // from: "accounts@user0.com",
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Account Role changed",
        html: message,
      });

      await user.save();
      res.status(200).json({
        success: true,
        message: `User Role updated to ${newRole} successfully`,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// activate user
router.put(
  `/activate-user/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status } = req.body;
      const id = req.params.id;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with the specified Id`,
        });
      }

      user.isActive = status;

      const message = `Hello ${user.name} your account has been activated  `;
      await sendMail({
        // from: "accounts@user0.com",
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Account Activation",
        html: message,
      });

      await user.save();
      res.status(200).json({
        success: true,
        message: `User status changed successfully to Active `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// deactivate user
router.put(
  `/deactivate-user/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status } = req.body;
      const id = req.params.id;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with the specified Id`,
        });
      }

      user.isActive = status;
      const message = `Hello ${user.name} your account has been deactivated `;
      await sendMail({
        // from: "accounts@user0.com",
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Account Deactivation",
        html: message,
      });

      await user.save();
      res.status(200).json({
        success: true,
        message: `User status changed successfully to Inactive `,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user
router.delete(
  `/delete-user/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const existsUser = await User.findById(id);
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

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with the specified Id`,
        });
      }

      const message = `Hello ${user.name} your account has been deleted `;
      await sendMail({
        // from: "accounts@user0.com",
        from: process.env.SMTP_MAIL,
        email: user.email,
        subject: "Account Deletion",
        html: message,
      });

      res.status(200).json({
        success: true,
        message: `User deleted Successfully `,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// find user information BY USER ID
router.get(`/user-info/:id`, isSeller, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = router;
