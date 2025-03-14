const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Label = require("./Label");
const FavoriteDisease = require("./Favorite_Disease");
const FavoriteMedicine = require("./Favorite_Medicine");

const FavoriteLabel = sequelize.define(
  "FavoriteLabel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    favorite_disease_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: FavoriteDisease,
        key: "id",
      },
    },
    favorite_medicine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: FavoriteMedicine,
        key: "id",
      },
    },
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Label,
        key: "id",
      },
    },
  },
  {
    tableName: "favorite_label",
    timestamps: false,
  }
);

FavoriteLabel.belongsTo(Label, { foreignKey: "label_id" });
FavoriteLabel.belongsTo(FavoriteDisease, { foreignKey: "favorite_disease_id" });
FavoriteLabel.belongsTo(FavoriteMedicine, { foreignKey: "favorite_medicine_id" });

module.exports = FavoriteLabel;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 