class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);         // calling the super class constructor
    this.statusCode = statusCode;    // adding statusCode to the object
  }
}

const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error ";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorMiddleware;
module.export =  ErrorHandler;
// this file will handle the error
