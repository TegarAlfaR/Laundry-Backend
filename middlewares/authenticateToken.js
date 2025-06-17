const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: "Failed",
      message: "Access denied. No token provided.",
      data: null,
    });
  }

  try {
    const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifiedPayload;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "Failed",
      message: "Invalid or expired token.",
      data: null,
    });
  }
};

module.exports = { authenticateToken };
