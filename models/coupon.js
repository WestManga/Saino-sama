const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID : String,
    Createdby : String,
    Code : String,
    Nominal : Number,
    Created : Date,
    Claimed : Boolean,
    userClaimed : String,
    DateClaimed : Date
})

module.exports = mongoose.model('coupon', Schema)