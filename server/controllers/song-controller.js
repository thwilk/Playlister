const auth = require('../auth');
const songdb = require('../db/songdb');


// params = id, body = song update
// return updated song
const updateSong = async (req, res) => {}

// return all songs
const getSongs = async (req, res) => {}

// params = id
// return song with id = id
const getSong = async (req, res) => {}

// params = id
// deletes song (200 if ok)
const deleteSong = async (req, res) => {}

// params = id, body = song update
// returns the newest song 
const createSong = async (req, res) => {}


module.exports = {
    createSong,
    deleteSong,
    getSong,
    getSongs,
    updateSong
} 
