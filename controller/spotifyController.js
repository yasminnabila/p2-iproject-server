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


}

module.exports = spotifyController;
