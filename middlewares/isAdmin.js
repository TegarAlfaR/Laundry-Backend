module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "Failed",
      message: "Failed, access denied. only admin can access this route",
      data: null,
    });
  }

  next();
};
