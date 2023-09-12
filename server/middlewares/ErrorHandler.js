class ErrorHandler extends Error {
  constructor(message, statuCode) {
    super(message);
    this.statusCode = statuCode;

    Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = ErrorHandler;
