/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const { store } = require('../controllers/index.js')

const router = express.Router()
const auth = require('../auth')

router.post('/playlist', store.createPlaylist)
router.delete('/playlist/:id', store.deletePlaylist)
router.get('/playlist/:id', store.getPlaylistById)
router.post('/playlistquery/', store.getPlaylistsWithQueries)
router.get('/playlistForUser', store.getPlaylistForUser)
router.get('/playlists', store.getPlaylists)
router.put('/playlist/:id', store.updatePlaylist)
router.put('/playlist/:id/addsong', store.addSongToPlaylist)

module.exports = router