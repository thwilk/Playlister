const express = require('express')
const { song } = require('../controllers/index.js')

const router = express.Router()
const auth = require('../auth')

router.patch('/song/:id', song.updateSong)
router.get('/song', song.getSongs)
router.patch('/song', song.getSongsByIds)
router.get('/song/:id', song.getSong)
router.delete('/song/:id', song.deleteSong)
router.post('/song', song.createSong)
router.patch('/song/addListen/:id', song.addListen)
router.patch('/querySongs', song.querySongs)


module.exports = router;