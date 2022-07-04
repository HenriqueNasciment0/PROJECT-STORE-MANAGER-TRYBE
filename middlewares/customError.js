const customError = (error, _req, res, _next) => {
  res.status(error.status).json({ message: error.message });
  console.log(error);
};

module.exports = customError;
