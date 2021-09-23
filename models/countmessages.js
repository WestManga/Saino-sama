const mongoose = require('mongoose')

let Schema = mongoose.Schema({
    userId: String,
    guildId: String,
    message: {
		now: {
            type: Number,
            default: 0
        },
		max: {
            type: Number,
            default: ''
        },
	},
    date: Date,
})

module.exports = mongoose.model("counting", Schema);