const router = require("express").Router();
const controller = require("../controllers");

router.get("/services", controller.serviceController.getServices);
router.post("/services/create", controller.serviceController.createServices);

router.get("/services/:id", controller.serviceController.getServiceById);
router.patch(
  "/services/update/:id",
  controller.serviceController.updateServices
);
router.patch(
  "/services/delete/:id",
  controller.serviceController.softDeleteService
);

module.exports = router;
