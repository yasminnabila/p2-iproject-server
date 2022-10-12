const router = require("express").Router();
const user = require("./user");
const playlist = require("./playlist");
const api = require("./api");
const ErrorHandler = require("../middlewares/ErrorHandler");

router.use("/", user);
router.use("/playlist", playlist);
router.use("/api", api);
router.use(ErrorHandler);

module.exports = router;
