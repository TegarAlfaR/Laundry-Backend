const router = require("express").Router();

const servicesRouter = require("./serviceRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const paymentRouter = require("./paymentRouter");

router.use("/", servicesRouter);
router.use("/", authRouter);
router.use("/", userRouter);
router.use("/", transactionRouter);
router.use("/", paymentRouter);

module.exports = router;
