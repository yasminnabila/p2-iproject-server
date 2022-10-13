const router = require("express").Router();
const spotifyController = require("../controller/spotifyController");
const { Authentication } = require("../middlewares/Authz");

router.get("/get-song", spotifyController.getSongById);
router.get("/get-album", spotifyController.getAlbumById);
router.get("/get-artist", spotifyController.getArtistById);
router.get("/search-song", spotifyController.searchSong);
router.get("/get-song-audio-features", spotifyController.getAudioFeatures);
router.get("/get-new-releases", spotifyController.getNewReleases);

module.exports = router;
