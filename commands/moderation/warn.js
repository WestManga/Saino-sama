const db = require('../../models/warns');
const db2 = require('../../models/Guild');
const User = require('../../models/User');
const { Client, Message, MessageEmbed, Guild } = require('discord.js');
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

        let target = await User.findOne({
			guildID: message.guild.id,
			userID: user.user.id,
		});

        if (!target) return bot.nodb(member.user);

        let rand = Math.floor(Math.random() * 100 + 50);
        target.money -= rand;
        target.warn++;
		target.save();

        user.send(new MessageEmbed()
            .setTitle("Kamu mendapatkan Warning!")
            .setDescription(`**Alasan :**\n${reason}`)
            .addField("Denda", `Rp. ${rand}`)
            .setColor("RED")
            .setTimestamp()
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
            .addField("Denda", `Rp. ${rand}`)
            .setTimestamp()
        )

        //MODLOG DATA CHANNEL
        let data2 =  await db2.findOne({
            guildID: message.guild.id
        });

        let channel = message.guild.channels.cache.find(ch => ch.name == data2.modlogChannel);
        let e = new MessageEmbed()
        .setAuthor(`NEW WARN | ${user.user.tag}`)
        .setColor("BLUE")
        .addField("User", user, true)
        .addField("Moderator", message.author, true)
        .addField("Alasan", `\`\`\`${reason}\`\`\``)
        .setTimestamp()
        .setFooter(`${message.member.id}`, message.guild.iconURL);
        client.channels.cache.get("821657287340720128").send(e);
    }
}