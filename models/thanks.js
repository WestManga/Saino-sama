const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true,
}

const thanksSchema = mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    received: {
        type: Number,
        default: 0,
    },
    lastGave: Date,
})

module.exports = mongoose.model("thank", thanksSchema);