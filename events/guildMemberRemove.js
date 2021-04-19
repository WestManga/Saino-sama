const client = require("../index");
const Schema = require("../models/Guild");
const { MessageEmbed } = require("discord.js");
const { COLOR } = process.env;


module.exports = async(member) => {
    Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
        if (!data) return;
        
        let embed = new MessageEmbed()
        .setColor(COLOR)
        .setDescription(`Bye-bye **${member.user}**`)
        .setFooter(`Jumlah member saat ini ${member.guild.memberCount}`)
        .setTimestamp();

        const channel = member.guild.channels.cache.get(data.byeChannel);
        channel.send(embed)
    })
}