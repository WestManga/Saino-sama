const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'clear-warn',
    description:'Menghapus semua warn dari member',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.').then(m => m.delete({ timeout : 5000 }))
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Menghapus semua warn dari user ${user.user.tag}`).then(m => m.delete({ timeout : 5000 }))
                //report
                let embed = new MessageEmbed()
                .setAuthor(`CLEAR WARN | ${user.user.tag}`)
                .setColor("BLUE")
                .addField("User", user, true)
                .addField("Moderator", message.author, true)
                .setTimestamp()
                .setFooter(`${message.member.id}`, message.guild.iconURL);

                client.channels.cache.get("807108631761649675").send(embed);
            } else {
                message.channel.send(`${user.user.tag} tidak mempunyai warn satupun..`).then(m => m.delete({ timeout : 5000 }))
            }
        })
    }
}