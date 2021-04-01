const {MessageEmbed} = require("discord.js");
const {
    COLOR
} = process.env;

module.exports = {
    name: "setmodlog",
    aliases: ["setmoderationlog","smodl"],
    description: "Setting tempat log moderator",
    usage: "<channel>",
    category: "guild",
    timeout: 100,
    run: async(bot, message, args) => {
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
        data.modlogChannel = channel; data.save();
    },
};