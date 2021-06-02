const mongoose = require('mongoose')

const thanksSchema = mongoose.Schema({
    userId: String,
    guildId: String,
    received: {
        type: Number,
        default: 0,
    },
    lastGave: Date,
})

module.exports = mongoose.model("thank", thanksSchema);