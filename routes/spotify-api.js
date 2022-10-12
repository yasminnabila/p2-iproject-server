const router = require("express").Router();
const spotifyController = require("../controller/spotifyController");
const { Authentication } = require("../middlewares/Authz");

router.use(Authentication);
router.get("/get-song", spotifyController.getSongById);
router.get("/search-song", spotifyController.searchSong);
router.get("/get-album", spotifyController.readAlbumById);

module.exports = router;
