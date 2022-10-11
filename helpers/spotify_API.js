const SpotifyWebApi = require("spotify-web-api-node");

//? Set credentials
const spotify = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/callback/",
  });
  //? Retrieve an access token and a refresh token
  const data = await spotifyApi.clientCredentialsGrant();

  //? Set the access token on the API object to use it in later calls
  spotifyApi.setAccessToken(data.body["access_token"]);
  spotifyApi.setRefreshToken(data.body["refresh_token"]);
  return spotifyApi;
};

module.exports = spotify;
