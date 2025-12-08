const { User, Playlist } = require('../models/association');

const createPlaylist = async (userId, body) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const { name, songs} = body;

    console.log(user.id)
    console.log(name)
    console.log(songs)

    const playlist = await Playlist.create({
        name,
        songKeys: songs,
        userId: user.id,
        listenedByGuest: false,
        listeners: [],

    });

    return playlist;
};

const deletePlaylist = async (playlistId, userId) => {
    const playlist = await Playlist.findByPk(userId);
    if (!playlist) throw new Error('Playlist not found');

    if (playlist.userId !== playlistId) throw new Error('Forbidden');

    await playlist.destroy();
    return true;
};

const getPlaylistById = async (id) => {
    const playlist = await Playlist.findByPk(id);
    if (!playlist) throw new Error('Playlist not found');

    return playlist;
};

const getPlaylistForUser = async (userId) => {
    const user = await User.findByPk(userId, { include: Playlist });
    if (!user) throw new Error('User not found');

    return user.Playlists.map(pl => ({ _id: pl.id, name: pl.name }));
};

const getPlaylists = async () => {
    const playlists = await Playlist.findAll();

    return playlists;
};

const updatePlaylist = async (playlistId, userId, body) => {
    const playlist = await Playlist.findByPk(userId);
    if (!playlist) throw new Error('Playlist not found');

    if (playlist.userId !== playlistId) throw new Error('Forbidden');

    playlist.name = body.name;
    playlist.songs = body.songs || [];
    await playlist.save();

    return playlist;
};

const addSongToPlaylist = async (playlistId, songId) => {
    const playlist = await Playlist.findById(playlistId);

    playlist.songs.push(songId);
    await playlist.save();

    return playlist;


}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistForUser,
    getPlaylists,
    updatePlaylist,
    addSongToPlaylist,
};
