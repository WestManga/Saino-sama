const { Message, MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name:'unmute',
  category:'moderation',
  description:'Membuka mute member',
  usage:'<member>',
  aliases:['lepas'],
  /**
   * 
   * @param {Message} message 
   */
  run: async(client, message, args) => {
        try {
            let author = message.guild.members.cache.get(message.author.id);
            if (!author.hasPermission('MANAGES_ROLES')) return message.channel.send("You dont have permission for used this command!");
       
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
            // Get data from Guild.modules //
            let data = await Guild.findOne({
                guildID: message.guild.id
            });

            // Check Muted Roles //
            const muteRole = message.guild.roles.cache.get(data.mutedRole)
            if (!muteRole) {
                return message.channel.send(
                    `You not set muted role. Please use command ${data.prefix}setmutedroles for setting muted roles!`
                );
            }

            // Check modlog-channel //
            const modlog = client.channels.cache.get(data.modlogChannel);
            if (!modlog) {
                return message.channel.send(
                    `Modlog not found. Set first use ${data.prefix}setch modlog`
                );
            }
            
            // Check target //
            if (!target) 
                return message.channel.send("Member is not found.");
            if (target.hasPermission("ADMINISTRATOR")) 
                return message.channel.send("I do not have permission to muted Administrator");
            if (target.user.id == author) 
                return message.reply("You idiot? why you unmute your self? Ba-baka!");
            if (!target.roles.cache.has(muteRole.id))
                return message.channel.send('This user is not muted!');
        
            // Find data //
            let dataquick = new db.table('Mutes')
            let korban = await dataquick.fetch(target.user.id)
            console.log('Data found at quick.db');
            if (!korban) return;
            let korban_role = dataquick.get(target.user.id)

            // Giveback member roles //
            for (let i = 0; i < korban_role.length; i++) {
                target.roles.add(korban_role[i])
            }

            // Give mutedroles //
            await target.roles.remove(muteRole).then(() => {
                message.delete()
                message.channel.send(`**${target.user.tag}** telah bebas dari mute`).then(m => m.delete({ timeout : 5000 }));
            })

            // Delete data from quick.db //
            await dataquick.delete(target.user.id)
            
            // Send embed to modlog //
            let embedmodlog = new MessageEmbed()
                .setAuthor(`NEW UNMUTED`)
                .setColor("GREEN")
                .addField("User", target, true)
                .addField("Moderator", message.author, true)
                .setTimestamp()
                .setFooter(`${message.member.id}`, message.guild.iconURL())
            modlog.send({ embed: embedmodlog});

        } catch (error) {
            console.log(error);
            return message.channel.send(`Wah kayanya error nih bos..`);
        }
    }
}