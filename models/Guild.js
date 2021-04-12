const mongoose = require("mongoose");

const schema = mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    welcomeChannel: {
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
    }
});

module.exports = mongoose.model("Guild", schema);