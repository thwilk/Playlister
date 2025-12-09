// server/controllers/postgres/store-controller.js
const { formatPlaylist } = require('./responseFormat');
const auth = require('../auth');
const storedb = require('../db/storedb');



const createPlaylist = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });

    const { name, songs } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'You must provide a Playlist name' });

    try {
        const playlist = await storedb.createPlaylist(userId, {name, songs} );
        const data = await formatPlaylist(playlist);
        return res.status(201).json({ playlist: data });
    } catch (err) {
        console.error(err);
        const message = err.message === 'Forbidden' ? 'Forbidden' : 'Playlist not WHYY';
        return res.status(400).json({ success: false, errorMessage: message });
    }
};

const deletePlaylist = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });

    const playlistId = parseInt(req.params.id, 10);
    if (!playlistId) return res.status(400).json({ success: false, error: 'Playlist ID required' });

    try {
        await storedb.deletePlaylist(userId, playlistId);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        const status = err.message === 'Forbidden' ? 403 : 404;
        return res.status(status).json({ success: false, errorMessage: err.message });
    }
};

const getPlaylistById = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });

    const playlistId = parseInt(req.params.id, 10);
    if (!playlistId) return res.status(400).json({ success: false, error: 'Playlist ID required' });

    try {
        const playlist = await storedb.getPlaylistById(playlistId);
        // const data = await formatPlaylist(playlist);
        return res.status(200).json({ success: true, playlist: playlist });
    } catch (err) {
        console.error(err);
        const status = err.message === 'Forbidden' ? 403 : 404;
        return res.status(status).json({ success: false, errorMessage: err.message });
    }
};

const getPlaylistForUser = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });

    try {
        const pairs = await storedb.getPlaylistForUser(userId);
        console.log("\n\n[PAIRS]: " + pairs[0]._id);
        return res.status(200).json({ success: true, idNamePairs: pairs });
    } catch (err) {
        console.error(err);
        return res.status(404).json({ success: false, errorMessage: err.message });
    }
};

const getPlaylists = async (req, res) => {

    try {
        const playlists = await storedb.getPlaylists();
        const data = await Promise.all(playlists.map(pl => formatPlaylist(pl)));
        return res.status(200).json({ success: true, idNamePairs: data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err });
    }
};

const getPlaylistsWithQueries = async (req, res) => {
    try {
        const { name, username, songTitle, songArtist, songYear } = req.body;

        if (!(name || username || songTitle || songArtist || songYear)){
            return res.status(400).json({ success: false, error: "please input something" });
        }
        

        const playlists = await storedb.getPlaylistQueries({
            playlistName: name || "",
            playlistOwner: username || "",
            songTitle: songTitle || "",
            songArtist: songArtist || "",
            songYear: songYear || ""
        });

        
        let data = [];
        if(playlists){
            data = await Promise.all(
                playlists.map(pl => formatPlaylist(pl))
            );
        }

        return res.status(200).json({ success: true, idNamePairs: data });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};

const updatePlaylist = async (req, res) => {
    const userId = auth.verifyUser(req);
    if (!userId) return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });

    const playlistId = parseInt(req.params.id, 10);
    const { playlist: playlistData } = req.body;

    if (!playlistId || !playlistData) return res.status(400).json({ success: false, error: 'Playlist ID and playlist data required' });

    try {
        const playlist = await storedb.updatePlaylist(userId, playlistId, playlistData);
        const data = await formatPlaylist(playlist);
        return res.status(200).json({
            success: true,
            id: playlist.id,
            playlist: data,
            message: 'Playlist updated'
        });
    } catch (err) {
        console.error(err);
        const status = err.message === 'Forbidden' ? 403 : 404;
        return res.status(status).json({ success: false, error: err.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    // const userId = await auth.verifyUser(req);
    // if (!userId) 
    //     return res.status(401).json({ success: false, errorMessage: 'UNAUTHORIZED' });
    
    const songId  = req.body.songId;
    const playlistId  = parseInt(req.params.id, 10);

    console.log("WHATTT" + playlistId)
    console.log("GAYYYY" + songId)

    const playlist = await storedb.addSongToPlaylist(playlistId, songId);
    const data = await formatPlaylist(playlist)
    return res.status(200).json({
        success: true,
        id: playlist.id,
        playlist: data,
        message: 'Playlist updated'
    });


}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistForUser,
    getPlaylists,
    updatePlaylist,
    getPlaylistsWithQueries,
    addSongToPlaylist
};
