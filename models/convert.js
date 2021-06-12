const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    convertdata: Array
})

module.exports = mongoose.model('convert', Schema)