const router = require("express").Router();
const spotifyController = require("../controller/spotifyController");
const { Authentication } = require("../middlewares/Authz");

router.use(Authentication);
router.get("/get-song", spotifyController.getSongById);
router.get("/get-album", spotifyController.getAlbumById);
router.get("/get-artist", spotifyController.getArtistById);
router.get("/search-song", spotifyController.searchSong);
router.get("/get-song-audio-features", spotifyController.getAudioFeatures);

module.exports = router;
