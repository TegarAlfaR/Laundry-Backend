const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/payment/create", paymentController.createPayment);
router.post("/payment/notification", paymentController.handleNotification);

module.exports = router;
