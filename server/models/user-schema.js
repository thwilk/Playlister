const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/index.js');

const User = conn.define(
    'User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: true, 
            },
          },
        profileAvatar: {
            type: DataTypes.TEXT,
            unique: false,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
        }   
    }
);


module.exports = User;