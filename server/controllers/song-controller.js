const auth = require('../auth');
const songdb = require('../db/songdb');



// -- TODO -- 
// params = id, body = song update
// return updated song
const updateSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });

    try{ 
    }
    catch (error) {

    }
    
}

// -- TODO -- 
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

// -- TODO -- 
// params = id
// return song with id = id
const getSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });
   
    try{ 
    }
    catch (error) {

    }
    
}

// -- TODO -- 
// params = id
// deletes song (200 if ok)
const deleteSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });
    try{ 
    }
    catch (error) {

    }
    
}

// body = song update
// returns the new song 
const createSong = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'Couldnt Verify User' });

    const { title, artist, year, youtubeId } = req.body;
    
    if(!title || !artist || !year || !youtubeId) return res.status(401).json({ success: false, errorMessage: 'Please Fill All Fields'});

    try{ 
        const newsong = await songdb.createSong(title, artist, year, youtubeId, userId);
        return res.status(200).json({success: true, song: newsong});
    }
    catch (error) {
        return res.status(401).json({ success: false, errorMessage: 'Database Issue' });
    }
    


}


module.exports = {
    createSong,
    deleteSong,
    getSong,
    getSongs,
    updateSong
} 
