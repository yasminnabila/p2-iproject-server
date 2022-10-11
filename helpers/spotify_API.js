const SpotifyWebApi = require("spotify-web-api-node");

//? Create the API object with the credentials
const spotify = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/callback/ ",
  });
  //? Retrieve an access token
  const data = await spotifyApi.clientCredentialsGrant();
  //? Save the access token so that it's used in future calls
  spotifyApi.setAccessToken(data.body["access_token"]);
  return spotifyApi;
};

module.exports = spotify;
