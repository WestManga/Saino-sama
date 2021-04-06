const {MessageEmbed} = require("discord.js");
const Guild = require('../../models/Guild');
const {
    COLOR
} = process.env;

module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    description: "Set Your Own Custom Prefix.",
    usage: "<prefix>",
    category: "settings",
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send("Please Specify The Prefix");
        if(args[0].length > 5) return message.channel.send("Max Characters is 5");
        let data = await Guild.findOne({
			guildID: message.guild.id
		});

        let e = new MessageEmbed()
        .setColor(COLOR)
        .setTitle(`Change Prefix`)
        .setDescription(`Succefully Change The Prefix To ${args[0]}`);
        message.channel.send({embed: e});
        data.prefix = args[0]; data.save();
    },
};