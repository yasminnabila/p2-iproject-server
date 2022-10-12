const spotify = require("../helpers/spotify");
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
      // console.log(req.user, "INI REQ USER");
      // console.log(req.body, "INI REQ BODY");

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

  static async readPlaylistById(req, res, next) {
    try {
      const { playlistId } = req.params;
      let playlist = await Song.findAll({
        where: {
          PlaylistId: playlistId,
        },
        include: {
          model: Playlist,
        },
      });
      let song = "";
      if (playlist.length === true) {
        let songs = playlist.map((el) => el.songId);
        const spotifyApi = await spotify();
        song = await spotifyApi.getTracks(songs);
        console.log(song);
        song.body.tracks.forEach((el, i) => {
          el.disc_number = playlist[i].id;
        });
        song.body.playlist = playlist[0].Playlist;
      } else {
        song = {
          body: [],
        };
      }
      res.status(200).json({
        data: song.body,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = playlistController;
