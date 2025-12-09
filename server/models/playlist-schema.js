const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/index.js');

const Playlist = conn.define('Playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    songKeys: {               
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    userId: {               
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    listeners: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },

    
    listenedByGuest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = Playlist;
