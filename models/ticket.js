const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Channel : String,
    Content : Array,
})

module.exports = mongoose.model('transcripts', Schema)