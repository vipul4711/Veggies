const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  ///Wrong MongoDb Id Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path} }`;
    err = new ErrorHandler(message, 400);
  }
  //Mogoose duplicate key error
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered}`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid , Try again.`;
    err = new ErrorHandler(message, 400);
  }

  //Token Expired
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired , Try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
