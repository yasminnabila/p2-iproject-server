const SpotifyWebApi = require("spotify-web-api-node");
const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];
const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:3000/callback/",
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

class userController {
  static async login(req, res, next) {
    try {
      res.redirect(spotifyApi.createAuthorizeURL(scopes));
    } catch (err) {
      next(err);
    }
  }

  //? get an access and refresh token
  static async callback(req, res, next) {
    try {
      const error = req.query.error;
      const code = req.query.code;
      const state = req.query.state;

      spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
          const access_token = data.body["access_token"];
          const refresh_token = data.body["refresh_token"];
          const expires_in = data.body["expires_in"];

          spotifyApi.setAccessToken(access_token);
          spotifyApi.setRefreshToken(refresh_token);

          if (!access_token || !refresh_token) {
            throw {
              code: 401,
              msg: "Error getting token",
            };
          }
          console.log("access_token:", access_token);
          console.log("refresh_token:", refresh_token);
          console.log(
            `Sucessfully retreived access token. Expires in ${expires_in} s.`
          );

          res
            .status(200)
            .json({ message: "Success! You can now close the window." });

          setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const access_token = data.body["access_token"];

            console.log("The access token has been refreshed!");
            console.log("access_token:", access_token);
            spotifyApi.setAccessToken(access_token);
          }, (expires_in / 2) * 1000);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
