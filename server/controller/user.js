const express = require(`express`);
// const path = require(`path`);
const router = express.Router();
const User = require(`../models/user`);
const ErrorHandler = require(`../utils/ErrorHandler`);
const { upload } = require(`../multer`);
// const upload = require(`../multer`).upload;
const fs = require(`fs`);
const uuid = require("uuid");
const jwt = require(`jsonwebtoken`);
const sendMail = require(`../utils/sendMail`);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  //console.log("Route handler is executing");
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  //console.log("User email:", userEmail);

  if (userEmail) {
    // User already exists
    const filename = req.file.filename;
    const filepath = `uploads/${filename}`;

    // Delete the uploaded file
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({message:`Error deleting file`})
      }
    });
    // Respond with an error message
    return next(new ErrorHandler(`User already exists`, 400));
  } else {
    // User does not exist, create the user
    const fileId = uuid.v4();
    const protocol = req.protocol;
    const host = req.get("host");
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    const user = {
      name: name,
      email: email,
      avatar: {
        public_id: fileId,
        url: fileUrl,
      },
      password: password,
    };

    const activationToken = createActivationToken(user);

    //http://localhost:1001/activationToken
    const activationUrl = `${protocol}://${host}/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email :- ${user.email} to activate ypur account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
    console.log(user);
    // const newUser = await User.create(user);

    // // Respond with success
    // res.status(201).json({
    //   success: true,
    //   newUser,
    //});
  }
});

//create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate user
router.post(
  `/activation`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler(error.message, 500));
      }
      const { name, email, password, avatar } = newUser;
      User.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(newUser, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

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
