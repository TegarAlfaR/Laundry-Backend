const router = require("express").Router();

const healthCheckRouter = require("./healthcheck");
const orderRouter = require("./orderRouter");

router.use("/", healthCheckRouter);
router.use("/", orderRouter);

module.exports = router;
