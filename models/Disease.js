const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

// Định nghĩa model cho bảng `cleaned_disease`
const Disease = sequelize.define('Disease', {
  ten_benh: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dinh_nghia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nguyen_nhan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  trieu_chung: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  chan_doan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dieu_tri: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'cleaned_disease',  
  timestamps: false,  
});

module.exports = Disease;
