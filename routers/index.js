const router = require("express").Router();

const healthCheckRouter = require("./healthcheck");

router.use("/", healthCheckRouter);

module.exports = router;
