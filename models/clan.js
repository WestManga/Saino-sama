const mongoose = require("mongoose");

const schema = mongoose.Schema({
    clanname: String,
    userID: String,
	leadername: String,
    createDate: Date,
    info: {
        description: {
            type: String,
            default: "This clan not have description",
        },
        status: {
            type: String,
            default: "Active",
        },
        logo: {
            type: String,
            default: "https://i.ibb.co/SddBfrs/logo.png"
        },
        banner: String,
        warna: {
            type: String,
            default: "FFFFFF",
        },
		clanrank: {
			type: String,
			enum: ["Normal", "Bronze", "Silver", "Gold", "Platinum"],
			default: "Normal",
		},
	},
    member: Array
});

module.exports = mongoose.model("clan", schema);