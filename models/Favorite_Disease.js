const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Disease = require("./Disease");

class FavoriteDisease extends Model {}

FavoriteDisease.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Disease,
        key: "id",
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "favorite_disease",
    timestamps: false,
  }
);

FavoriteDisease.belongsTo(User, { foreignKey: "user_id" });
FavoriteDisease.belongsTo(Disease, { foreignKey: "disease_id" });

module.exports = FavoriteDisease;
