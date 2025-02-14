const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

// Định nghĩa model cho bảng `cleaned_medicine_details`
const Medicine = sequelize.define('Medicine', {
  medicine_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  composition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uses: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  side_effects: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  excellent_review_percent: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  average_review_percent: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  poor_review_percent: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'cleaned_medicine_details',  
  timestamps: false,  
});

module.exports = Medicine;
