const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

const Medicine = sequelize.define('Medicine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ten_thuoc: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  thanh_phan: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  cong_dung: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tac_dung_phu: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  hinh_anh: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  nha_san_xuat: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  danh_gia_tot: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  },
  danh_gia_trung_binh: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  },
  danh_gia_kem: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  }
}, {
  tableName: 'cleaned_medicine',  
  timestamps: false,  
});

module.exports = Medicine;
