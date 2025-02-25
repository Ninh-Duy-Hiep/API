const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Medicine = require('./Medicine');

const Favorite = sequelize.define('Favorite', {
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
      key: 'id'
    }
  },
  medicine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medicine,
      key: 'id'
    }
  }
}, {
  tableName: 'favorites',
  timestamps: false
});
Favorite.belongsTo(User, { foreignKey: 'user_id' });
Favorite.belongsTo(Medicine, { foreignKey: 'medicine_id' });

module.exports = Favorite;
