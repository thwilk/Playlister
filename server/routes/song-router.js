const express = require('express')
const { song } = require('../controllers/index.js')

const router = express.Router()
const auth = require('../auth')

router.get('/songpairs', auth.verify, song.getSongPairs)
router.patch('/song/:id', auth.verify, song.updateSong)
router.get('/song/:id', auth.verify, song.getSong)
router.delete('/song/:id', auth.verify, song.deleteSong)
router.post('/song', auth.verify, song.createSong)




module.exports = router;