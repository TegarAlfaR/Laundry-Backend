const router = require("express").Router();
const controller = require("../controllers");

router.get("/health-check", controller.healCheckController.healthCheck);

module.exports = router;
