const router = require("express").Router();
const controller = require("../controllers");
const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const checkAuthorize = require("../middlewares/checkAuthorize");

router.get("/users", authenticate, isAdmin, controller.userController.getUsers);
router.get(
  "/users/:id",
  authenticate,
  checkAuthorize,
  controller.userController.getUserById
);
router.patch(
  "/users/update/:id",
  authenticate,
  checkAuthorize,
  controller.userController.updateUser
);

module.exports = router;
