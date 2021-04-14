const db = require('../../models/warns')
const User = require('../../models/User')
const { Client, Message, MessageEmbed } = require('discord.js')

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
        let target = await User.findOne({
			guildID: message.guild.id,
			userID: user.user.id,
		});

        let data = await Guild.findOne({
            guildID: message.guild.id
        });
    
        const modlog = client.channels.cache.get(data.modlogChannel);

        if (!target) return bot.nodb(member.user);
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

                modlog.send(embed);
            } else {
                message.channel.send('Member ini bersih dari warn..').then(m => m.delete({ timeout : 1000 }))
            }
        })
        target.warn -= Math.floor(parseInt(1));
        target.save();
    }
}