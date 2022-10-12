const router = require("express").Router();
const user = require("./user");
const ErrorHandler = require("../middlewares/ErrorHandler");

router.use("/", user);
router.use(ErrorHandler);

module.exports = router;
