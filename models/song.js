"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.Playlist);
    }
  }
  Song.init(
    {
      songId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Song Id is required",
          },
          notEmpty: {
            msg: "Song Id cannot be empty",
          },
        },
      },
      PlaylistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Playlist Id is required",
          },
          notEmpty: {
            msg: "Playlist Id cannot be empty",
          },
        },
        references: {
          model: "Playlists",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
