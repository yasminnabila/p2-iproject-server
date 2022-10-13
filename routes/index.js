const router = require("express").Router();
const user = require("./user");
const playlist = require("./playlist");
const api = require("./spotify-api");
const ErrorHandler = require("../middlewares/ErrorHandler");

router.get("/", (req, res) => {
  res.send("Haloo");
});

router.use("/", user);
router.use("/playlist", playlist);
router.use("/api", api);
router.use(ErrorHandler);

module.exports = router;
