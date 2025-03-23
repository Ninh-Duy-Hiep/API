// label.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
// const FavoriteLabel = require("./Favorite_Label");

class Label extends Model {}

Label.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "#FFFFFF",
    },
  },
  {
    sequelize,
    tableName: "labels",
    timestamps: false,
  }
);

module.exports = Label;

// Label.hasMany(FavoriteLabel, { foreignKey: "label_id" });
// Label.belongsTo(User, { foreignKey: "user_id" });
