const router = require("express").Router();
const playlistController = require("../controller/playlistController");
const { Authentication, Authorized } = require("../middlewares/Authz");

router.get("/", playlistController.readAllPlaylist);
router.post("/", playlistController.addPlaylist);
router.use(Authentication);
router.get("/:playlistId", playlistController.readPlaylistById);
router.delete("/:playlistId", Authorized, playlistController.deletePlaylist);
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

module.exports = router;
