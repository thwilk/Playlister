const dotenv = require('dotenv')

dotenv.config()

const db = process.env.CURRENT_DB;
let controllers;

controllers = {
        auth: require('./auth-controller.js'),
        store: require('./store-controller')
}

module.exports = controllers;
