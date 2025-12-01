const User = require('./user-schema');
const Song = require('./song-schema');
const Playlist = require('./playlist-schema');

User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Song, { foreignKey: 'createdBy' });
Song.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = { User, Playlist };
