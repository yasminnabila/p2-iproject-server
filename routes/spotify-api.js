const router = require("express").Router();
const spotifyController = require("../controller/spotifyController");
const { Authentication, Authorized } = require("../middlewares/Authz");

router.get("/get-song", spotifyController.getSongById);

module.exports = router;
