const mongoose = require("mongoose");

const schema = mongoose.Schema({
    account: {
		username: String,
		userId: String,
        servers: Array,
		patreon: {
			type: String,
			enum: ["", "Bronze", "Silver", "Gold", "Platinum"],
			default: "",
		},
	},
    userID: String,
    guildID: String,
    username: String,
    money: {
        type: Number,
        default: 0
    },
    point: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    messages: {
        type: Number,
        default: 0
    },
    warn: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: `Jonesmania`
    },
    waifu: {
        type: String,
        default: `Mama Altina`
    },
    _time: {
        type: Number,
        default: 0
    },
    afk: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Not Afk"
    },
    banner: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("User", schema);