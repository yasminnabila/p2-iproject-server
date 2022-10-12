const spotify = require("../helpers/spotify");
const { Playlist, Song } = require("../models");

class spotifyController {
  //? GET TRACKS
  // https://api.spotify.com/v1/tracks/id
  static async getSongById(req, res, next) {
    try {
      const { id } = req.query;
      const spotifyApi = await spotify();
      const song = await spotifyApi.getTracks([id, id, id]);
      res.status(200).json({
        statusCode: 200,
        data: song.body,
      });
    } catch (error) {
      next(error);
    }
  }

  //? SEARCH TRACK
  // https://api.spotify.com/v1/search?type=album&include_external=audio
  static async searchSong(req, res, next) {
    try {
      const { q } = req.query;
      const spotifyApi = await spotify();
      const song = await spotifyApi.searchTracks(`track:${q}`);
      res.status(200).json({
        statusCode: 200,
        data: song.body,
      });
    } catch (error) {
      next(error);
    }
  }

  //? GET ALBUM
  static async readAlbumById(req, res, next) {
    try {
      const { albumId } = req.query;
      const spotifyApi = await spotify();
      const album = await spotifyApi.getAlbum(albumId);
      res.status(200).json({
        data: album.body,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = spotifyController;
