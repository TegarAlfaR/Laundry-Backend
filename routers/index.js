const router = require("express").Router();

const healthCheckRouter = require("./healthCheck");
const servicesRouter = require("./serviceRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

router.use("/", healthCheckRouter);
router.use("/", servicesRouter);
router.use("/", authRouter);
router.use("/", userRouter);

module.exports = router;
