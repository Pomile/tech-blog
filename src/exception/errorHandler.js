
class ErrorHandler extends Error {
    constructor(message, statusCode, info) {
      super(message);
      this.statusCode = statusCode;
      this.msg = message;
      this.info = info
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
  