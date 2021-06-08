const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    UserID : String,
    BookID : Array,
})

module.exports = mongoose.model('hfav', Schema)