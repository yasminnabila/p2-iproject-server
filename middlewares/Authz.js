const { tokenJWT } = require("../helpers/jwt");
const { User, Playlist } = require("../models");

const isLoggedIn = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) {
      throw {
        code: 401,
        msg: "No token is received",
      };
    }
    const payload = tokenJWT(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw {
        code: 401,
        msg: "Invalid token",
      };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const isAuthorized = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { playlistId } = req.params;

    console.log(authorId, playlistId, "<<<<<");

    const findPlaylist = await Playlist.findByPk(playlistId);
    if (!findPlaylist) {
      throw {
        code: 404,
        msg: "Playlist Not Found",
      };
    }

    if (findUser.id !== findPlaylist.UserId) {
      throw {
        code: 403,
        msg: "Forbidden access",
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorizationAdmin;

module.exports = {
  isLoggedIn,
  isAuthorized,
};
