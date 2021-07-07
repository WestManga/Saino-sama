const mongoose = require('mongoose');

const reqString = {
    type: String,
    require: true,
}

const thankslb = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
})

module.exports = mongoose.model('thanks-lb', thankslb)