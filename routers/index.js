const router = require("express").Router();

const healthCheckRouter = require("./healthCheck");
const servicesRouter = require("./serviceRouter");

router.use("/", healthCheckRouter);
router.use("/", servicesRouter);

module.exports = router;
