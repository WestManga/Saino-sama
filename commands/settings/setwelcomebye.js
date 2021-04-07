const { Client, MessageEmbed } = require("discord.js");
const {
    COLOR
} = process.env;

module.exports = {
    name: "setwelcomebye",
    aliases: ["setwelcomechannel","setchwel"],
    description: "Setting tempat bot menyapa member baru",
    usage: "<channel>",
    category: "settings",
    run: async(client, message, args) => {
        let data = await Guild.findOne({
            guildID: message.guild.id
        });
        let channel =  message.mentions.channels.first();
        if(!channel) return message.channel.send("Please Provide a channel");
        let e = new MessageEmbed()
        .setDescription(`Successfully set welcome channel at ${channel}`)
        .setTimestamp(new Date())
        .setColor(COLOR)
        message.channel.send({embed: e});
        data.welcomeChannel = channel.id; data.save();
    },
};