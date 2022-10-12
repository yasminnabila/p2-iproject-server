const router = require("express").Router();
const playlistController = require("../controller/playlistController");
const { isLoggedIn, isAuthorized } = require("../middlewares/Authz");

router.use(isLoggedIn);
router.get("/", playlistController.readAllPlaylist);
router.post("/", playlistController.addPlaylist);
router.get("/:playlistId", playlistController.readPlaylistById);

module.exports = router;
