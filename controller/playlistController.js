const { Playlist, Song } = require("../models");

class playlistController {
  static async readAllPlaylist(req, res, next) {
    try {
      const { id } = req.user;
      const playlist = await Playlist.findAll({
        where: {
          UserId: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        data: playlist,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = playlistController;
