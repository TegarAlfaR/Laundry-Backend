const router = require("express").Router();
const controller = require("../controllers");

router.get("/users", controller.userController.getUsers);
router.get("/users/:id", controller.userController.getUserById);
router.patch("/users/update/:id", controller.userController.updateUser);

module.exports = router;
