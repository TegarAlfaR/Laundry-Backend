const router = require("express").Router();

const controller = require("../controllers");

router.get("/orders", controller.orderController.getOrders);
router.get("/orders/:id", controller.orderController.getOrderById);
router.post("/orders", controller.orderController.createOrder);
router.delete("/orders/:id", controller.orderController.hardDeleteOrder);

module.exports = router;
