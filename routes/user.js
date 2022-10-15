const router = require("express").Router();
const userController = require("../controller/userController");
const { Authentication } = require("../middlewares/Authz");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.use(Authentication);
router.post("/payments", userController.snapPayment);

module.exports = router;
