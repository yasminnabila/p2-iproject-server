const { compareHashedPassword } = require("../helpers/bcryptjs");
const { signJWT } = require("../helpers/jwt");
const { User } = require("../models/index");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          code: 401,
          msg: "Email/ password cannot be empty",
        };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw {
          code: 401,
          msg: "Invalid email/ password",
        };
      }
      const comparePassword = compareHashedPassword(
        foundUser.password,
        password
      );
      if (!comparePassword) {
        throw {
          code: 401,
          msg: "Invalid email/ password",
        };
      }
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      const token = signJWT(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
