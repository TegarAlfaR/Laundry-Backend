const router = require("express").Router();
const controller = require("../controllers");

router.get("/health-check", controller.healthCheckController.healthCheck);

module.exports = router;
