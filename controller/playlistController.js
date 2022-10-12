const { Playlist, Song } = require("../models");

class playlistController {
  static async readAllPlaylist(req, res, next) {
    try {
      const { id } = req.user;
      console.log(req.user);
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

  static async addPlaylist(req, res, next) {
    try {
      const { id } = req.user;
      const { name, imageUrl } = req.body;
      console.log(req.user, "INI REQ USER");
      console.log(req.body, "INI REQ BODY");

      await Playlist.create({
        name,
        imageUrl,
        UserId: id,
      });
      res.status(201).json({
        statusCode: 201,
        message: "Playlist created successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = playlistController;
