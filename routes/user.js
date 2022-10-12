const router = require("express").Router();
const userController = require("../controller/userController");
const { Authentication } = require("../middlewares/Authz");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", Authentication, userController.me);

module.exports = router;
