const SpotifyWebApi = require("spotify-web-api-node");

// //? Set credentials
// const spotify = async () => {
//   const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     redirectUri: "http://localhost:3000/callback/",
//   });
//   //? Retrieve an access token and a refresh token
//   const data = await spotifyApi.clientCredentialsGrant();

//   //? Set the access token on the API object to use it in later calls
//   spotifyApi.setAccessToken(data.body["access_token"]);
//   spotifyApi.setRefreshToken(data.body["refresh_token"]);
//   return spotifyApi;
// };
const spotify = async () => {
  const scopes = ["user-read-private", "user-read-email"],
    redirectUri = "https://localhost:3000/callback",
    clientId = "process.env.SPOTIFY_CLIENT_ID",
    state = "";

  // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
  });

  // Create the authorization URL
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
  console.log(authorizeURL);

  const code = req.query.code;

  const data = await spotifyApi.clientCredentialsGrant();
};

module.exports = spotify;
