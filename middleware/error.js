const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  //mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(
      `Bootcamp not found with id of ${err.value}`,
      404
    );
  }

  //mongoose duplicate key
  if (error.code === 11000) {
    error = new ErrorResponse(`Duplicate field value entered`, 400);
  }

  //mongoose validation error
  if (err.name === "ValidationError") {
    error = new ErrorResponse(Object.values(err.errors), 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
