const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Medicine = require('./Medicine');

// Kế thừa từ Sequelize.Model
class Favorite_Medicine extends Model {}

Favorite_Medicine.init(
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
        key: 'id',
      },
    },
    medicine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medicine,
        key: 'id',
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'favorite_medicine',
    timestamps: false,
  }
);

// Định nghĩa các quan hệ
Favorite_Medicine.belongsTo(User, { foreignKey: 'user_id' });
Favorite_Medicine.belongsTo(Medicine, { foreignKey: 'medicine_id' });

module.exports = Favorite_Medicine;
