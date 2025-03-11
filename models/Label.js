const { DataTypes } = require('sequelize');
const sequelize  = require('../config/database');
const User = require('./User');

const Label = sequelize.define(
    "Label",
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
        name : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#FFFFFF",
        },
    },
    {
        tableName: "labels",
        timestamps: false,
    }
);
Label.belongsTo(User, { foreignKey: "user_id" });

module.exports = Label;