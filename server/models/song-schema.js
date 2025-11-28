const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/index.js');

const Song = conn.define(
    'Song', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        youtubeId: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
        }   
    }
);


module.exports = Song;