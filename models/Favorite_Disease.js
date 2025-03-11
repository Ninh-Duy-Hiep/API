const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Disease = require('./Disease'); // Đảm bảo model Disease đã được tạo

const FavoriteDisease = sequelize.define('FavoriteDisease', {
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
  disease_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Disease,
      key: 'id'
    }
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'favorite_disease',
  timestamps: false
});

// Thiết lập quan hệ
FavoriteDisease.belongsTo(User, { foreignKey: 'user_id' });
FavoriteDisease.belongsTo(Disease, { foreignKey: 'disease_id' });

module.exports = FavoriteDisease;
