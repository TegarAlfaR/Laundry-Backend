// middlewares/authenticate.js (Versi Gabungan & Terbaik)

const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

module.exports = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      status: "Failed",
      message: "Access Denied. Token is missing.",
      data: null,
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found for this token.",
        data: null,
      });
    }

    req.user = user.dataValues;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: "Failed",
        message: "Token has expired. Please login again.",
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid Token." });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
};
