const { Client, Message, MessageEmbed } = require("discord.js");
const discord = require('discord.js'); 

/**
 * @param {Client} client
 * @param {Message} message
 * @param {[]} args
 */

module.exports = {
    name : 'ban',
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
            return message.reply('Anda tidak bisa membanned diri anda sendiri.');

        // Ketika yang membanned adalah member
        if (!author.hasPermission("BAN_MEMBERS"))
            return;

        // Ketika yang dibanned adalah admin/momod
        if (member.hasPermission("BAN_MEMBERS"))
            return message.reply('Siapa kamu hey??');

        member.ban({ reason: reason })
            .then(banMember => {
                message.reply(`Anda berhasil menendang **${banMember.user.tag}** dengan alasan:\n${reason}`);
            })
            .catch(err => {
                message.reply(`Sepertinya ada masalah!\n\`\`\`${err.message}\`\`\``);
            });

        let data = await Guild.findOne({
                guildID: message.guild.id
            });
        
        const modlog = client.channels.cache.get(data.modlogChannel);

        let embed = new MessageEmbed()
            .setAuthor(`BANNED | ${member.user.tag}`)
            .setColor(roleColor)
            .addField("User", member, true)
            .addField("Moderator", message.author, true)
            .addField("Alasan", reason, true)
            .setTimestamp()
            .setFooter(`${message.member.id}`, message.guild.iconURL())
        modlog.send(embed);
    }
}