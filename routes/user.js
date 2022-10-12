const router = require("express").Router();
const userController = require("../controller/userController");
const { isLoggedIn } = require("../middlewares/Authz");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", isLoggedIn, userController.me);

module.exports = router;
