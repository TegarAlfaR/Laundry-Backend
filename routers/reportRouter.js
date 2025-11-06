const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// GET /api/reports/transactions?startDate=2025-01-01&endDate=2025-12-31&status=success
router.get("/reports/transactions", reportController.getTransactionReport);

module.exports = router;
