const router = require("express").Router();
const controller = require("../controllers");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.post("/auth/register", controller.authController.register);
router.post("/auth/login", controller.authController.login);
router.post("/auth/logout", controller.authController.logout);
router.get("/auth/me", authenticateToken, controller.authController.getMe);

module.exports = router;
