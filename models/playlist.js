'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Playlist.belongsTo(models.User);
       Playlist.hasMany(models.Song);
    }
  }
  Playlist.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Playlist name is required",
          },
          notEmpty: {
            msg: "Playlist name cannot be empty",
          },
        },
      },
      imageUrl: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id is required",
          },
          notEmpty: {
            msg: "User Id cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};