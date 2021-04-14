const { Message, MessageEmbed } = require("discord.js");
const Schema = require('../../models/mute');

module.exports = {
  name:'mute',
  category:'moderation',
  description:'Membisukan member',
  usage:'<member>',
  aliases:['bisu'],
  /**
   * 
   * @param {Message} message 
   */
  run: async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("You do not have permission to use this command");
        const Member = 
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
        if (!Member) return message.channel.send("Member is not found.");
        if (Member.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to muted Administrator");
        const role = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === 'muted'
        );
        if (!role) {
            try {
                message.channel.send("Role muted is not found. Attemping to create another one")

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        VIEW_CHANNEL: false
                    })
                });
                message.channel.send('muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`);
        await Member.roles.add(role2);
        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (!data) {
                new Schema({
                    Guild: message.guild.id,
                    Users: Member.id,
                }).save();
            } else {
                data.Users.push(Member.id);
                data.save();
            }
        });
        message.channel.send(`${Member.displayName} is now muted`);

        let data2 = await Guild.findOne({
            guildID: message.guild.id
        });
    
        const modlog = client.channels.cache.get(data2.modlogChannel);

        let embed = new MessageEmbed()
            .setAuthor(`NEW MUTED`)
            .setColor("YELLOW")
            .addField("User", Member, true)
            .addField("Moderator", message.author, true)
            .setTimestamp()
            .setFooter(`${message.member.id}`, message.guild.iconURL())

        modlog.send(embed);
    }
}