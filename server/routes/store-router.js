/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const { store } = require('../controllers/index.js')

const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, store.createPlaylist)
router.delete('/playlist/:id', auth.verify, store.deletePlaylist)
router.get('/playlist/:id', store.getPlaylistById)
router.post('/playlistquery/', store.getPlaylistsWithQueries)
router.get('/playlistForUser', auth.verify, store.getPlaylistForUser)
router.get('/playlists', auth.verify, store.getPlaylists)
router.put('/playlist/:id', auth.verify, store.updatePlaylist)
router.put('/playlist/:id/addsong', auth.verify, store.addSongToPlaylist)

module.exports = router