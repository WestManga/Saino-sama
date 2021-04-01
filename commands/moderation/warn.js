const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')
const mongoose = require('mongoose');

module.exports = {
    name :'warn',
    description:'Memberikan warning kepada member',
    cooldown:5,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command.').then(m => m.delete({ timeout : 5000 }))
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.').then(m => m.delete({ timeout : 5000 }))
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });

        
        user.send(new MessageEmbed()
            .setDescription(`Kamu mendapatkan warning dengan alasan :\n${reason}`)
            .setColor("RED")
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
        )

        //MODLOG DATA CHANNEL
        let data =  await Guild.findOne({
            guildID: message.guild.id
        });

        let channel = message.guild.channels.cache.find(ch => ch.name == data.modlogChannel);

        let embed = new MessageEmbed()
        .setAuthor(`NEW WARN | ${user.user.tag}`)
        .setColor("BLUE")
        .addField("User", user, true)
        .addField("Moderator", message.author, true)
        .addField("Alasan", reason, true)
        .setTimestamp()
        .setFooter(`${message.member.id}`, message.guild.iconURL);

        if(channel) {
            channel.send(embed);
        }
    }
}