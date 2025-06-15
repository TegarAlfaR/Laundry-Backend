const router = require("express").Router();

// const healthCheckRouter = require("./healthCheck");
const servicesRouter = require("./serviceRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");

// router.use("/", healthCheckRouter);
router.use("/", servicesRouter);
router.use("/", authRouter);
router.use("/", userRouter);
router.use("/", transactionRouter);

module.exports = router;
