const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'remove-warn',
    description:'Menghapus warn member',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.').then(m => m.delete({ timeout : 5000 }))
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.').then(m => m.delete({ timeout : 5000 }))
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('deleted the warn').then(m => m.delete({ timeout : 1000 }))
                data.save()

                let embed = new MessageEmbed()
                .setAuthor(`REMOVE WARN | ${user.user.tag}`)
                .setColor("BLUE")
                .addField("User", user, true)
                .addField("Moderator", message.author, true)
                .setTimestamp()
                .setFooter(`${message.member.id}`, message.guild.iconURL);

                client.channels.cache.get("821657287340720128").send(embed);
            } else {
                message.channel.send('Member ini bersih dari warn..').then(m => m.delete({ timeout : 1000 }))
            }
        })
    }
}