class ErrorHandler extends Error {
  constructor(message, statuCode) {
    super(message);
    this.statuCode = statuCode;

    Error.captureStackTrace(this, this.constractor);
    }
};

module.exports = ErrorHandler;
