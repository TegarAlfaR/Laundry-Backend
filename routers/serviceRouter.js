const router = require("express").Router();
const controller = require("../controllers");
const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");

router.get("/services", controller.serviceController.getServices);
router.post(
  "/services/create",
  authenticate,
  isAdmin,
  controller.serviceController.createServices
);

router.get("/services/:id", controller.serviceController.getServiceById);
router.patch(
  "/services/update/:id",
  authenticate,
  isAdmin,
  controller.serviceController.updateServices
);
router.patch(
  "/services/delete/:id",
  authenticate,
  isAdmin,
  controller.serviceController.softDeleteService
);

module.exports = router;
