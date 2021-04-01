const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'notes',
    description:'Melihat daftar Catatan Member',
    cooldown:5,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.').then(m => m.delete({ timeout : 5000 }))
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.username} Notes`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nNotes : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setTitle(`${user.user.username} Notes`)
                .setDescription('Tidak ada catatan')
                .setColor("BLUE")
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                )
            }

        })
    }
}