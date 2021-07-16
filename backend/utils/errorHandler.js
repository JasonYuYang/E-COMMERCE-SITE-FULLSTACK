class ErrorHandler extends Error {
  constructor(message, errorCode) {
    super(message); // Add a "message" property
    this.code = errorCode; // Adds a "code" property
    this.isOperational = true; //Handling only operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
