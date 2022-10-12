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

  //? GET ALBUM
  static async getAlbumById(req, res, next) {
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

  //? GET ARTIST
  // https://api.spotify.com/v1/artists/id
  static async getArtistById(req, res, next) {
    try {
      const { artistId } = req.query;
      const spotifyApi = await spotify();
      const artist = await spotifyApi.getArtist(artistId);
      const album = await spotifyApi.getArtistAlbums(artistId);
      const tracks = await spotifyApi.getArtistTopTracks(artistId, "ID");
      const relatedArtist = await spotifyApi.getArtistRelatedArtists(
        artistId,
        "ID"
      );

      let result = [];
      album.body.items.forEach((el) => {
        if (el.available_markets.includes("ID")) {
          result.push(el);
        }
      });
      res.status(200).json({
        data: {
          artist: artist.body,
          albums: result,
          tracks: tracks.body.tracks,
          relatedArtist: artist.body.artist,
        },
      });
    } catch (err) {
      next(err);
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

  //? GET AUDIO FEATURES
  static async getAudioFeatures(req, res, next) {
    try {
      const { songId } = req.query;
      const spotifyApi = await spotify();
      let audioFeature = await spotifyApi.getAudioFeaturesForTrack(songId);
      res.status(200).json({
        statusCode: 200,
        data: audioFeature.body,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = spotifyController;
