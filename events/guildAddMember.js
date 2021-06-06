const Schema = require("../models/Guild");
const { MessageEmbed } = require("discord.js");
const { COLOR } = process.env;
const gif = require("nekos.life");
const { sfw } = new gif();


module.exports = async(member) => {
    Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
        if (!data) return;
        if (data.active.welcome === false) return;
        const channel = member.guild.channels.cache.get(data.welcomeChannel);
        if (!channel) return;

        let hug = await sfw.hug();
        const user = member.user;
        const avatar = user.avatarURL({ size: 4096 });
        
        let embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor(`${member.user.tag}`, `${avatar}`)
        .setDescription(`**Selamat datang** ${user} di **${member.guild.name}** ヾ(≧▽≦*)o \nDimohon untuk dapat membaca <#787178816652050432> ya, sebentar kok!\nKamu dapat ambil role yang kamu mau di <#787165322670768129>`)
        .setImage(hug.url)
        .setFooter(`Saat ini jumlah member di ${member.guild.name} adalah ${member.guild.memberCount}`);
        channel.send(embed)
    })
}