const router = require("express").Router();
const playlistController = require("../controller/playlistController");

router.get("/", playlistController.readAllPlaylist);

module.exports = router;
