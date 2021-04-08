const { Client, Message, MessageEmbed } = require("discord.js");
const discord = require('discord.js'); 

/**
 * @param {Client} client
 * @param {Message} message
 * @param {[]} args
 */

module.exports = {
    name : 'kick',
    run : async(client, message, args) => {
        const roleColor =
        message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ") || "Tidak ada alasan";
        let author = message.guild.members.cache.get(message.author.id);

        // Ketika tidak ada di mention
        if (!member)
            return;

        // Ketika usernamenya sama ama yang di mention
        if (member.user.id === message.author.id)
            return message.reply('Anda tidak bisa kick diri anda sendiri.');

        // Ketika yang membanned adalah member
        if (!author.hasPermission("KICK_MEMBERS"))
            return;

        // Ketika yang dibanned adalah admin/momod
        if (member.hasPermission("KICK_MEMBERS"))
            return message.reply('Siapa kamu hey??');

        member.kick({ reason: reason })
            .then(kickMember => {
                message.reply(`Anda berhasil menendang **${kickMember.user.tag}** dengan alasan:\n${reason}`);
            })
            .catch(err => {
                message.reply(`Sepertinya ada masalah!\n\`\`\`${err.message}\`\`\``);
            });
        let embed = new MessageEmbed()
            .setAuthor(`KICK | ${member.user.tag}`)
            .setColor(roleColor)
            .addField("User", member, true)
            .addField("Moderator", message.author, true)
            .addField("Alasan", reason, true)
            .setTimestamp()
            .setFooter(`${message.member.id}`, message.guild.iconURL())

        client.channels.cache.get("807108631761649675").send(embed);
    }
}