const router = require("express").Router();
const controller = require("../controllers");

router.get("/services", controller.serviceController.getServices);
router.post("/services", controller.serviceController.createServices);

router.get("/services/:id", controller.serviceController.getServiceById);
router.patch("/services/:id", controller.serviceController.updateServices);
router.patch("/services/:id", controller.serviceController.softDeleteService);

module.exports = router;
