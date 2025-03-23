const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Label = require("./Label");
const FavoriteDisease = require("./Favorite_Disease");
const FavoriteMedicine = require("./Favorite_Medicine");

class FavoriteLabel extends Model {}

FavoriteLabel.init(
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
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Label,
        key: "id",
      },
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
  },
  {
    sequelize,
    tableName: "favorite_label",
    timestamps: false,
  }
);

module.exports = FavoriteLabel;

// FavoriteLabel.belongsTo(User, { foreignKey: "user_id" });
// FavoriteLabel.belongsTo(Label, { foreignKey: "label_id" });
// FavoriteLabel.belongsTo(FavoriteDisease, { foreignKey: "favorite_disease_id" });
// FavoriteLabel.belongsTo(FavoriteMedicine, {
//   foreignKey: "favorite_medicine_id",
// });
