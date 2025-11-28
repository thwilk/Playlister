const dotenv = require('dotenv')

dotenv.config()

const db = process.env.CURRENT_DB;
let controllers;

controllers = {
        auth: require('./auth-controller'),
        store: require('./store-controller'),
        song: require('./song-controller')
}

module.exports = controllers;
