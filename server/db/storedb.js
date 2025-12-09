const { User, Playlist } = require('../models/association');
const songDb = require('./songdb')
const { Op } = require('sequelize');


const createPlaylist = async (userId, body) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const { name, songs} = body;

    console.log(user.id)
    console.log(name)
    console.log(songs)

    const playlist = await Playlist.create({
            name,
            songKeys: Array.isArray(songs) ? songs : [],
            userId: user.id,
            listenedByGuest: false,
            listeners: [],
    });

    return playlist;
};

const deletePlaylist = async (playlistId, userId) => {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) throw new Error('Playlist not found');

    if (playlist.userId !== playlistId) throw new Error('Forbidden');

    await playlist.destroy();
    return true;
};

const getPlaylistById = async (id) => {
    const playlist = await Playlist.findByPk(id);
    if (!playlist) throw new Error('Playlist not found');

    return {
        id: playlist.id,
        name: playlist.name,
        songKeys: playlist.songKeys || [],
        userId: playlist.userId,
        listeners: playlist.listeners || [],
        listenedByGuest: playlist.listenedByGuest,
    };
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

const getPlaylistQueries = async (queries) => {
    const { playlistName, playlistOwnerId, songTitle, songArtist, songYear } = queries;


    let playlists = await Playlist.findAll({
        where: {
            ...(playlistName && { name: { [Op.iLike]: `%${playlistName}%` } }),
            ...(playlistOwnerId && { userId: playlistOwnerId })
        }
    });

    const hasSongFilters =
        (songTitle && songTitle !== "") ||
        (songArtist && songArtist !== "") ||
        (songYear && songYear !== "");

    if (!hasSongFilters) {
        return playlists;
    }


    const filtered = [];

    for (const playlist of playlists) {
        const songs = await songDb.findSongsById(playlist.songKeys);

        const matches = songs.some(song => {
            const titleMatch = !songTitle || new RegExp(songTitle, "i").test(song.title);
            const artistMatch = !songArtist || new RegExp(songArtist, "i").test(song.artist);
            const yearMatch = !songYear || String(song.year) === String(songYear);

            return titleMatch && artistMatch && yearMatch;
        });

        if (matches) filtered.push(playlist);
    }

    return filtered;
};


const updatePlaylist = async (playlistId, userId, body) => {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) throw new Error('Playlist not found');

    if (playlist.userId !== userId) throw new Error('Forbidden');

    playlist.name = body.name;
    playlist.songKeys = Array.isArray(body.songs) ? [...body.songs] : [];
    await playlist.save();

};

const addSongToPlaylist = async (playlistId, songId) => {
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) throw new Error(`Playlist with id ${playlistId} not found`);

    const songKey = Number(songId);
    if (!Number.isInteger(songKey)) throw new Error(`Invalid songId: ${songId}`);

    if (!Array.isArray(playlist.songKeys)) {
        playlist.songKeys = [];
    }

    // console.log("songKeys before:", playlist.songKeys);

    if (!playlist.songKeys.includes(songKey)) {
        playlist.songKeys = [...playlist.songKeys, songKey]; // instead of push
    }

    // console.log("songKeys after:", playlist.songKeys);

    await playlist.save();


    return playlist;
};

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistForUser,
    getPlaylists,
    updatePlaylist,
    addSongToPlaylist,
    getPlaylistQueries
};
