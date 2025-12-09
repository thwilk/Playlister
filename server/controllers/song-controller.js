const auth = require('../auth');
const songdb = require('../db/songdb');



// params = id, body = song update
// return updated song
const updateSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });
    
    const songId = req.params.id;
    const data = req.body;
    try{ 
        const updatedsong = await songdb.updateSong(songId, userId, data);
        if(updatedsong)
            return res.status(201).json({success: true, song: updateSong});
    }
    catch (error) {
        return res.status(404).json({ success: false, errorMessage: err.message });
    }
    
}

// return all songs 
const getSongs = async (req, res) => {
    try {
        const songs = await songdb.getAllSongs();
        return res.status(200).json({ success: true, songs: songs });
    } catch (err) {
        console.error(err);
        return res.status(404).json({ success: false, errorMessage: err.message });
    }
}

const getSongsByIds = async (req, res) => {
    const { keys } = req.body;
    try {
        const songs = await songdb.findSongsById(keys);
        console.log(songs);
        return res.status(200).json({ success: true, songs: songs });
    } catch (err) {
        console.error(err);
        return res.status(404).json({ success: false, errorMessage: err.message });
    }
}

// params = id
// return song with id = id
const getSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });
   
    const songId = req.params.id;
    if(!songId) return res.status(401).json({ success: false, errorMessage: 'Please Fill All Parameters'});


    try{ 
        const song = await songdb.findSongById(songId);
        if(song)
            return res.status(200).json({success: true, song: song});
        return res.status(401).json({ success: false, errorMessage: "Couldnt Fufill" });

    }
    catch (error) {
        return res.status(401).json({ success: false, errorMessage: error.message });
    }
    
}

// params = id
// deletes song (200 if ok)
const deleteSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });
    
    const { songId } = req.params.id;
    if(!songId) return res.status(401).json({ success: false, errorMessage: 'Please Fill All Parameters'});
    

    //Core
    try{ 
        const deleted = await storedb.deleteSong(songId, userId);
        if(deleted)
            return res.status(200).json({success: true})
        return res.status(401).json({ success: false, errorMessage: "Couldnt Fufill" });
    }
    catch (error) {
        return res.status(401).json({ success: false, errorMessage: error.message });
    }
    
}

// body = song update
// returns the new song 
const createSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'Couldnt Verify User' });

    const { title, artist, year, youtubeId } = req.body;
    
    if(!title || !artist || !year) return res.status(401).json({ success: false, errorMessage: 'Please Fill All Fields'});
    // youtube id needed too ^ 
    try{ 
        const newsong = await songdb.createSong(title, artist, year, youtubeId, userId);
        return res.status(200).json({success: true, song: newsong});
    }
    catch (error) {
        return res.status(401).json({ success: false, errorMessage: error.message });
    }
}

const addListen = async (req, res) =>{
    const { songId } = req.params.id;

    try{
        await songdb.addListen(songId);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(401).json({ success: false, errorMessage: error.message });
    }
}
const querySongs = async (req, res) => {

    const {title, artist, year} = req.body;
    try {
        const songs = await songdb.querySongs(title, artist, year);

        if(!songs){
            return res.status(404).json({ success: false, errorMessage: "No songs like that " });
        }

        return res.status(200).json({ success: true, data: songs });
    }
    catch (error) {
        return res.status(401).json({ success: false, errorMessage: error.message });
    }

}


module.exports = {
    createSong,
    deleteSong,
    getSong,
    getSongs,
    getSongsByIds,
    updateSong,
    addListen,
    querySongs
} 
