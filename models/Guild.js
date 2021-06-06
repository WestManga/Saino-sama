const mongoose = require("mongoose");

const schema = mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    fined: {
		min: {
            type: Number,
            default: "50"
        },
		max: {
            type: Number,
            default: "100"
        },
	},
    money: {
		min: {
            type: Number,
            default: "6"
        },
		max: {
            type: Number,
            default: "3"
        },
	},
    welcomeChannel: {
        type: String,
        default: ''
    },
    suggestionChannel: {
        type: String,
        default: ''
    },
    levelUpChannel: {
        type: String,
        default: ''
    },
    modlogChannel: {
        type: String,
        default: ''
    },
    moneylogChannel: {
        type: String,
        default: ''
    },
    moneyincomelogChannel: {
        type: String,
        default: ''
    },
    byeChannel: {
        type: String,
        default: ''
    },
    chatmoneyChannel: {
        type: String,
        default: ''
    },
    musicChannel: {
        type: String,
        default: ''
    },
    storyChannel: {
        type: String,
        default: ''
    },
    categorychatMoney: {
        type: String,
        default: ''
    },
    mutedRole: {
        type: String,
        default: ''
    },
    ruangbk: {
        type: String,
        default: ''
    },
    active: {
		welcome: {
            type: Boolean,
            default: "false"
        },
		bye: {
            type: Boolean,
            default: "false"
        },
        apply: {
            type: Boolean,
            default: "false"
        },
	}
});

module.exports = mongoose.model("Guild", schema);