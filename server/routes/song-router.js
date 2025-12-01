const express = require('express')
const { song } = require('../controllers/index.js')

const router = express.Router()
const auth = require('../auth')

router.patch('/song/:id', auth.verify, song.updateSong)
router.get('/song', song.getSongs)
router.get('/song/:id', auth.verify, song.getSong)
router.delete('/song/:id', auth.verify, song.deleteSong)
router.post('/song', auth.verify, song.createSong)
router.patch('/song/addListen/:id', song.addListen)


module.exports = router;