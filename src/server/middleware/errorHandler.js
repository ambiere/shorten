module.exports = function errorHandler(error, request, response, next) {
  if (error.message === "Invalid URL") {
    response.status(400).json({ error: error.message, statusCode: 400 });
  }
  next(error);
};
