const { Client, Message, MessageEmbed } = require("discord.js");
const {
    COLOR
} = process.env;

module.exports = {
    name: "setmodlog",
    aliases: ["setmoderationlog","smodl"],
    description: "Setting tempat log moderator",
    usage: "<channel>",
    category: "settings",
    /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        const channel = message.mentions.channels.first() || message.channel;
        let data = await Guild.findOne({
            guildID: message.guild.id
        });
        if(!channel) return message.channel.send("Please Provide a channel");
        let e = new MessageEmbed()
        .setDescription(`Successfully set modlog channel at ${channel}`)
        .setTimestamp(new Date())
        .setColor(COLOR)
        message.channel.send({embed: e});
        data.modlogChannel = channel.id; data.save();
    },
};