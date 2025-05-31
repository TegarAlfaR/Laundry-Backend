module.exports = (req, res, next) => {
  const requestedUserId = parseInt(req.params.id);
  const loggedInUserId = req.user.userId;

  if (requestedUserId !== loggedInUserId) {
    return res.status(403).json({
      status: "Failed",
      message: "Failed, access denied. only owner can access this route",
      data: null,
    });
  }
  next();
};
