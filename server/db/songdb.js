const Song = require('../models/song-schema');


const findSongById = async (id) => {
    const song = await Song.findByPk(id);
    return { 
        _id: song.id, 
        title: song.title,
        artist: song.artist,
        year: song.year,
        youtubeId: song.youtubeId,
        listens: song.lisens,
        createdBy: song.createdBy
    };
};

const findSongsById = async (ids) => { // ids should be an array of songs 
    return ids.map(id => findSongById(id)); // calls above 
};

const createSong = async (title, artist, year, youtubeId, createdBy) => {
    const listens = 0;
    const newSong = await Song.create({ title, artist, year, youtubeId, listens, createdBy});
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

const getAllSongs = async () => {
    const songs = await Song.findAll();
    if (!songs) throw new Error('No songs in catalogue');

    return songs.map(song => ({ 
        _id: song.id, 
        title: song.title,
        artist: song.artist,
        year: song.year,
        youtubeId: song.youtubeId,
        listens: song.lisens,
        createdBy: song.createdBy
    }));
};

const addListen = async (id) => {
    try {
        const song = await Song.findByPk(id);
        song.listens = song.listens + 1;

        await song.save();

        return true;
    }
    catch (err) {
        throw new Error("Couldnt Update Listens")
    }
}

//deletes song WITH NO CHECKS
const deleteSong = async (songId, userId) => {
    const song = await Song.findSongByPk(songId);
    if (!song) throw new Error('Song not found');
    
    if(song.createdBy != userId) throw new Error('Forbidden');

    await song.destroy();
    return true;
}

module.exports = {
    findSongById,
    findSongsById,
    createSong,
    updateSong,
    getAllSongs,
    deleteSong,
    addListen
}