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
        statusCode: 201,
        message: "User created successfully",
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
        statusCode: 200,
        message: "User logged in successfully",
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static snapPayment(req, res, next) {
    const midtransClient = require("midtrans-client");

    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let random = Math.random() * 100;

    let parameter = {
      transaction_details: {
        order_id: `YOUR-ORDERID-${random}`,
        gross_amount: 30000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        username: `${req.user.username}`,
        email: `${req.user.email}`,
      },
    };

    snap
      .createTransaction(parameter)
      .then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        // console.log("transactionToken:", transactionToken);
        res.status(201).json({ transactionToken: transactionToken });
      })
      .catch((error) => {
        next(error);
      });
  }
}

module.exports = userController;
