const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/login", userController.login);
router.get("/callback", userController.callback);

module.exports = router;
