const ErrorHandler = require(`../utils/ErrorHandler`);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || `Internal Server Error`;

  // wrong MongoDb
  if (err.name === `CastError`) {
    const message = `Resource not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === `JsonWebTokenError`) {
    const message = `Your URL is invalid. Try again later`;
    err = new ErrorHandler(message, 400);
  }

  // if jwt expired
  if (err.name === `TokenExpiredError`) {
    const message = `Your URL has expired. Please try again later`;
    err = new ErrorHandler(message, 400);
  }

  // Nodemailer Errors
  // SMTP server error
  if (err.syscall === `getaddrinfo`) {
    const message = `Mailing system currently down... please try again latter`;
    err = new ErrorHandler(message, 400);
  }

  // SMT connection error
  if (err.syscall === "connect") {
    const message = `Mailing system connection error... please try again latter`;
    err = new ErrorHandler(message, 400);
  }

  // Cloudinary error
  if (err.type === `entity.too.large`) {
    const message = `Your file is too large to upload... please try another one`;
    err = new ErrorHandler(message, 413);
  }

  // syscall: 'getaddrinfo',
  //   hostname: 'api.cloudinary.com'

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
