module.exports = async (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "API not found",
    isSuccess: false,
    data: null,
  });
};
