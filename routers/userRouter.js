const router = require("express").Router();
const controller = require("../controllers");

router.get("/users", controller.userController.getUsers);
router.get("/users/:id", controller.userController.getUserById);

module.exports = router;
