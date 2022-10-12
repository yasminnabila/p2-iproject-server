const router = require("express").Router();
const playlistController = require("../controller/playlistController");
const { Authentication, Authorized } = require("../middlewares/Authz");

router.use(Authentication);
router.get("/", playlistController.readAllPlaylist);
router.post("/", playlistController.addPlaylist);
router.get("/:playlistId", playlistController.readPlaylistById);
router.patch(
  "/:playlistId/:songId",
  Authorized,
  playlistController.addSongToPlaylist
);
router.delete(
  "/:playlistId/:songId",
  Authorized,
  playlistController.deleteSongFromPlaylist
);
router.delete("/:playlistId", Authorized, playlistController.deletePlaylist);

module.exports = router;
