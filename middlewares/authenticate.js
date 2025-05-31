const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({
      status: "Failed",
      message: "Failed,Token is missing",
      data: null,
    });
  }

  try {
    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
        data: null,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid token",
        data: null,
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: "Failed",
        message: "Token has expired",
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      data: null,
    });
  }
};
