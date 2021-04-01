const db = require('../../models/notes')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'clearnotes',
    description:'Menghapus semua notes dari member',
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
                message.channel.send(`Menghapus semua note dari user ${user.user.tag}`).then(m => m.delete({ timeout : 5000 }))
                //report
                let embed = new MessageEmbed()
                .setAuthor(`CLEAR NOTES | ${user.user.tag}`)
                .setColor("BLUE")
                .addField("User", user, true)
                .addField("Moderator", message.author, true)
                .setTimestamp()
                .setFooter(`${message.member.id}`, message.guild.iconURL);

                client.channels.cache.get("821657287340720128").send(embed);
            } else {
                message.channel.send(`${user.user.tag} tidak mempunyai note satupun..`).then(m => m.delete({ timeout : 5000 }))
            }
        })
    }
}