class userController {
  static async signUp(req, res, next) {
    try {
      const { username, email, password } = req.body;
      await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  //? SIGN IN
  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw {
          name: "INVALID_USER_OR_PASSWORD",
        };
      }
      const comparePassword = compareHashedPassword(
        foundUser.password,
        password
      );
      if (!comparePassword) {
        throw {
          name: "INVALID_USER_OR_PASSWORD",
        };
      }
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      const token = payloadToToken(payload);
      res.status(200).json({
        statusCode: 200,
        message: "User logged in successfully",
        access_token: token,
        email: email,
        username: foundUser.username,
        id: foundUser.id,
        role: foundUser.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
