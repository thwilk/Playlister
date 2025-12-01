const Song = require('../models/song-schema');


const findSongById = async (id) => {
    return await Song.findByPk(id);
};

const findSongsById = async (ids) => { // ids should be an array of songs 
    const songs = ids.map(id => findSongByPk(id))
    return songs;
};

const createSong = async (title, artist, year, youtubeId) => {
    const listens = 0;
    const listenedByGuest = false;
    const newSong = await Song.create({ title, artist, year, youtubeId, listens, listenedByGuest });
    
    return newSong;
}

const updateSong = async (songId, title, artist, year, youtubeId) => {

    const song = Song.findByPk(songId);

    song.title = title || song.title;
    song.artist = artist || song.artist;
    song.year = year || song.year;
    song.youtubeId = youtubeId || song.youtubeId;

    await song.save();

    return song;
}

const getSongPairs = async () => {
    const songs = await Song.findAll();
    if (!songs) throw new Error('No songs in catalogue');

    return songs.Playlists.map(song => ({ 
        _id: song.id, 
        title: song.title,
        artist: song.artist,
        year: song.year,
        youtubeId: song.youtubeId 
    }));
};


//deletes song WITH NO CHECKS
const deleteSong = async (id) => {
    const song = await Song.findSongByPk(id);
    if (!song) throw new Error('Playlist not found');
    await song.destroy();
    return true;
}

module.exports = {
    findSongById,
    findSongsById,
    createSong,
    updateSong,
    getSongPairs,
    deleteSong,
}