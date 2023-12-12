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

      const newUser = await User.create({
        name,
        email,
        avatar: {
          public_id: fileId,
          url: fileUrl,
        },
        password,
      });
      console.log(newUser);

      // You can send a response or do any other necessary actions here.
      res.status(201).json({
        success: true,
        message: `Account created successfully`,
        user: newUser,
      });
    } catch (error) {
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
            "Invalid credentials. Please provide the correct information.",
        });
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
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
        xpires: new Date(Date.now()),
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

//   if (userEmail) {
//      const filename = req.file.filename;
//      const filePath = `uploads/${filename}`;
//     // fs.unlink(filePath, (err) => {
//     //   if (err) {
//     //     console.log(err);
//     //     res.status(500).json({message:`Error deleting file`})
//     //   } else {
//     //     res.json({message:`File deleted successfully`})
//     //   }
//     // })

//     return next(new ErrorHandler(`User already exists`, 400));
//   }

//   const uuid = require('uuid'); // Import the UUID library

// // Generate a unique identifier for the file
//  const fileId = uuid.v4(); // Use UUID v4 for random identifiers
//   //const filename = req.file.filename;
//   const protocol = req.protocol; // Get the protocol (http or https)
//   const host = req.get("host"); // Get the domain and port
//  //const fileUrl = path.join(filename);
//   const fileUrl = `${protocol}://${host}/uploads/${filename}`;
//   const user = {
//     name: name,
//     email: email,
//     avatar: {
//       public_id: fileId,
//       url: fileUrl,
//     },
//     password: password,
//   };
//   // const newUser = await User.create(user);
//   // res.status(201).json({
//   //   success: true,
//   //   newUser,
//   // });
//   console.log(user);
// });
