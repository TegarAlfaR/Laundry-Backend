const router = require("express").Router();
const controller = require("../controllers");
const authenticate = require("../middlewares/authenticate");
const checkAuthorize = require("../middlewares/checkAuthorize");
const isAdmin = require("../middlewares/isAdmin");

router.get(
  "/transactions",
  authenticate,
  controller.transactionController.getTransaction
);
router.post(
  "/transactions",
  authenticate,
  controller.transactionController.createTransaction
);
router.patch(
  "/transactions/:id",
  authenticate,
  isAdmin,
  controller.transactionController.updateTransaction
);

module.exports = router;
