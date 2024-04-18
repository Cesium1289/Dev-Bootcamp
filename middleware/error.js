const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error;

  //mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(
      `Bootcamp not found with id of ${err.value}`,
      404
    );
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
