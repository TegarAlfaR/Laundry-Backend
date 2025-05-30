const router = require("express").Router();
const controller = require("../controllers");

router.post("/auth/register", controller.authController.register);
router.post("/auth/login", controller.authController.login);
router.post("/auth/logout", controller.authController.logout);

module.exports = router;
