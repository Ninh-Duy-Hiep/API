const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' 
  }
});

// Hash mật khẩu trước khi lưu
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
